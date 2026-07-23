// Pull-request checks:
//   1. `version` moves legally: a new QEP starts unversioned (v0); once a QEP is
//      versioned it stays versioned; a first version is 1; otherwise it stays equal
//      (editorial) or increments by one (substantive) relative to the base branch.
//   2. `type` and `status` are known values.
//   3. The README Type/Status/Version columns match each QEP's frontmatter.
// Run by .github/workflows/qep-checks.yml. Exits non-zero on any failure.
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { FRONTMATTER, parseQep, qepFiles, readIndex, versionCell } from './qeps.mjs';

const base = process.env.BASE_REF || 'main';
const errors = [];

const TYPES = new Set(['standard', 'process', 'informational']);
const STATUSES = new Set(['Draft', 'Accepted', 'Rejected', 'Withdrawn', 'Superseded']);

// State of a QEP file on the base branch: whether it existed, and its `version`
// (read from the frontmatter only, so a body YAML example is ignored).
function baseState(path) {
  let text;
  try {
    text = execSync(`git show "origin/${base}:${path}"`, {
      stdio: ['pipe', 'pipe', 'ignore'],
    }).toString();
  } catch {
    return { existed: false, version: undefined };
  }
  const fm = text.match(FRONTMATTER);
  const block = fm ? fm[1] : text;
  const m = block.match(/^version:[ \t]*(\d+)/m);
  return { existed: true, version: m ? Number(m[1]) : undefined };
}

// 1. version moves legally relative to the base branch.
for (const path of qepFiles()) {
  const { version } = parseQep(path);
  const { existed, version: prev } = baseState(path);

  if (!existed) {
    // A brand-new QEP must start unversioned (implicitly v0).
    if (version !== undefined) {
      errors.push(`${path}: a new QEP must start unversioned (v0) — remove the version field`);
    }
    continue;
  }
  if (version === undefined) {
    // Dropping `version` is only legal if the QEP was never versioned.
    if (prev !== undefined) {
      errors.push(`${path}: version ${prev} was removed; once versioned, a QEP stays versioned`);
    }
    continue;
  }
  if (prev === undefined) {
    if (version !== 1) {
      errors.push(`${path}: introduces version ${version}; a first version must be 1`);
    }
  } else if (version !== prev && version !== prev + 1) {
    errors.push(
      `${path}: version ${prev} -> ${version} must stay equal (editorial) or increment by one (substantive)`,
    );
  }
}

// 2/3. type/status enums, and README Type/Status/Version parity with frontmatter.
const idx = readIndex();
if (idx.cols.type === -1) errors.push(`${'README.md'}: index table is missing a Type column`);
if (idx.cols.status === -1) errors.push(`${'README.md'}: index table is missing a Status column`);
if (idx.cols.version === -1) errors.push(`${'README.md'}: index table is missing a Version column`);
const rows = new Map(idx.rows.map((r) => [r.qep, r]));
for (const path of qepFiles()) {
  const q = parseQep(path);
  if (q.qep === undefined) continue;

  if (q.type !== undefined && !TYPES.has(q.type)) {
    errors.push(`${path}: unknown type "${q.type}" (expected one of ${[...TYPES].join(', ')})`);
  }
  if (q.status !== undefined && !STATUSES.has(q.status)) {
    errors.push(`${path}: unknown status "${q.status}" (expected one of ${[...STATUSES].join(', ')})`);
  }

  const row = rows.get(q.qep);
  if (!row) {
    errors.push(`README index has no row for QEP-${q.qep} (${path})`);
    continue;
  }
  const expect = (label, colIdx, want) => {
    if (colIdx === -1) return;
    const got = row.cells[colIdx];
    if (got !== want) errors.push(`QEP-${q.qep}: README ${label} "${got}" != frontmatter "${want}"`);
  };
  expect('Type', idx.cols.type, q.type);
  expect('Status', idx.cols.status, q.status);

  // Version parity, tolerating a hand-typed ASCII "-" or empty cell for a v0 QEP:
  // stamp.mjs normalises it to the en dash post-merge, so don't block the PR on it.
  if (idx.cols.version !== -1) {
    const got = row.cells[idx.cols.version];
    const want = versionCell(q.version); // en dash for v0
    const v0ok = q.version === undefined && (got === '-' || got === '');
    if (got !== want && !v0ok) {
      errors.push(`QEP-${q.qep}: README Version "${got}" != frontmatter "${want}"`);
    }
  }
}

// 4. `related` frontmatter stays in lockstep with the header table's
//    **Related** row (the primary human record). Both absent is fine; one
//    without the other, a self-reference, or differing QEP sets is an error.
//    A related QEP whose file is not on this branch only warns — in-flight
//    drafts may reference each other across branches; once both merge the
//    warning disappears.
for (const path of qepFiles()) {
  const q = parseQep(path);
  const row = readFileSync(path, 'utf8').match(/^\|\s*\*\*Related\*\*\s*\|(.*)\|\s*$/m);
  const inTable = row ? [...row[1].matchAll(/qep-(\d{4})/g)].map((m) => Number(m[1])) : [];
  const inFm = q.related ?? [];
  if (!row && inFm.length === 0) continue;
  if (!row) {
    errors.push(`${path}: has related: [...] frontmatter but no **Related** row in the header table`);
    continue;
  }
  if (inFm.length === 0) {
    errors.push(`${path}: has a **Related** header-table row but no related: [...] frontmatter`);
    continue;
  }
  const fmSet = [...new Set(inFm)].sort((a, b) => a - b);
  const tableSet = [...new Set(inTable)].sort((a, b) => a - b);
  if (JSON.stringify(fmSet) !== JSON.stringify(tableSet)) {
    errors.push(
      `${path}: related frontmatter [${fmSet.join(', ')}] != header-table Related row [${tableSet.join(', ')}]`,
    );
  }
  for (const n of fmSet) {
    if (n === q.qep) {
      errors.push(`${path}: related lists itself (QEP-${n})`);
    } else if (!qepFiles().some((p) => p.includes(`/qep-${String(n).padStart(4, '0')}-`))) {
      console.warn(`WARN ${path}: related QEP-${n} not on this branch (in-flight draft?)`);
    }
  }
}

if (errors.length) {
  console.error('QEP checks failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log('QEP checks passed.');
