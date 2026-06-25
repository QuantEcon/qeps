// Pull-request checks:
//   1. `version`, when present, only ever increments by one (and a first
//      version is 1) relative to the base branch.
//   2. The README Type/Status/Version columns match each QEP's frontmatter.
// Run by .github/workflows/qep-checks.yml. Exits non-zero on any failure.
import { execSync } from 'node:child_process';
import { FRONTMATTER, parseQep, qepFiles, readIndex, versionCell } from './qeps.mjs';

const base = process.env.BASE_REF || 'main';
const errors = [];

// `version` of a QEP file on the base branch (undefined if absent / new / v0).
function baseVersion(path) {
  let text;
  try {
    text = execSync(`git show "origin/${base}:${path}"`, {
      stdio: ['pipe', 'pipe', 'ignore'],
    }).toString();
  } catch {
    return undefined; // file did not exist on the base branch
  }
  // Read `version` from the frontmatter only — ignore any body YAML example.
  const fm = text.match(FRONTMATTER);
  const block = fm ? fm[1] : text;
  const m = block.match(/^version:[ \t]*(\d+)/m);
  return m ? Number(m[1]) : undefined;
}

// 1. version increments by at most one; a newly introduced version must be 1.
for (const path of qepFiles()) {
  const { version } = parseQep(path);
  if (version === undefined) continue; // v0 — always fine
  const prev = baseVersion(path);
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

// 2. README Type/Status/Version columns match frontmatter.
const idx = readIndex();
if (idx.cols.type === -1) errors.push(`${'README.md'}: index table is missing a Type column`);
if (idx.cols.version === -1) errors.push(`${'README.md'}: index table is missing a Version column`);
const rows = new Map(idx.rows.map((r) => [r.qep, r]));
for (const path of qepFiles()) {
  const q = parseQep(path);
  if (q.qep === undefined) continue;
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
  expect('Version', idx.cols.version, versionCell(q.version));
}

if (errors.length) {
  console.error('QEP checks failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log('QEP checks passed.');
