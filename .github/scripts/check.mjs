// Pull-request checks:
//   1. `version` moves legally: a new QEP starts unversioned (v0); once a QEP is
//      versioned it stays versioned; a first version is 1; otherwise it stays equal
//      (editorial) or increments by one (substantive) relative to the base branch.
//   2. `type` and `status` are known values.
//   3. The README Type/Status/Version columns match each QEP's frontmatter.
// Run by .github/workflows/qep-checks.yml. Exits non-zero on any failure.
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { FRONTMATTER, parseQep, qepFiles, readIndex, renderIndex } from './qeps.mjs';

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
for (const path of qepFiles()) {
  const q = parseQep(path);
  if (q.qep === undefined) continue;

  if (q.type !== undefined && !TYPES.has(q.type)) {
    errors.push(`${path}: unknown type "${q.type}" (expected one of ${[...TYPES].join(', ')})`);
  }
  if (q.status !== undefined && !STATUSES.has(q.status)) {
    errors.push(`${path}: unknown status "${q.status}" (expected one of ${[...STATUSES].join(', ')})`);
  }
}

// Every QEP file declares a number, and no two declare the same one. The index is
// generated from these, so a missing number drops a QEP out of the table silently
// and a duplicate emits two rows under one heading — neither shows up anywhere
// else. QEP-1 expects colliding proposals to be "adjusted at merge"; this is what
// tells the author there is a collision to adjust.
{
  const seen = new Map();
  for (const path of qepFiles()) {
    const q = parseQep(path);
    if (q.qep === undefined) {
      errors.push(`${path}: no "qep:" number in the frontmatter`);
      continue;
    }
    if (seen.has(q.qep)) {
      errors.push(`${path}: QEP number ${q.qep} is already used by ${seen.get(q.qep)}`);
      continue;
    }
    seen.set(q.qep, path);
  }
}

// The index is GENERATED post-merge from frontmatter (stamp.mjs), so a PR need
// not carry its own row and row content is never a PR failure: that is what
// stops two QEP PRs colliding on one line of one table. A stale index is worth
// saying out loud, though, so the author is not surprised by the bot commit.
{
  const want = renderIndex(idx, qepFiles().map((p) => parseQep(p)));
  if (want.join('\n') !== idx.lines.join('\n')) {
    // `::warning::` so this lands as a PR annotation: the parity check is a warning
    // now, and a line in the raw log is a signal nobody reads on a green check.
    console.warn(
      '::warning file=README.md::the index differs from what frontmatter implies; ' +
        'stamp.mjs will regenerate it after merge (this is not a failure)',
    );
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

// 5. Ordered-list numbering ascends in source.
//    Markdown renumbers an ordered list on render, so a repeated or out-of-order
//    marker looks correct on the page while every external "clause N" citation
//    silently shifts. QEP-6's Adoption section shipped as 1., 2., 2., 3., 4. and
//    survived a twelve-amendment review, a field report and four PR comments —
//    which is why this is a check and not a convention.
{
  const FENCE = /^\s*(?:```|~~~)/;
  for (const path of qepFiles()) {
    const lines = readFileSync(path, 'utf8').split('\n');
    const runs = new Map(); // indent -> { last, line }
    let fenced = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (FENCE.test(line)) {
        fenced = !fenced;
        // A fence ends only the lists it is not nested inside: an INDENTED fence is
        // a continuation of its list item, so the run around it must survive, or a
        // marker repeated across it goes unreported. Same indent rule as below.
        const fi = line.match(/^(\s*)/)[1].length;
        for (const k of [...runs.keys()]) if (k >= fi) runs.delete(k);
        continue;
      }
      if (fenced) continue;

      const item = line.match(/^(\s*)(\d+)\.\s/);
      if (item) {
        const indent = item[1].length;
        const n = Number(item[2]);
        for (const k of [...runs.keys()]) if (k > indent) runs.delete(k); // deeper lists end
        const prev = runs.get(indent);
        if (prev !== undefined && n <= prev.last) {
          errors.push(
            `${path}:${i + 1}: ordered-list marker "${n}." does not ascend ` +
              `(previous was "${prev.last}." at line ${prev.line}); Markdown renumbers on ` +
              `render, so a repeat shifts every external "clause N" citation`,
          );
        }
        runs.set(indent, { last: n, line: i + 1 });
        continue;
      }

      if (line.trim() === '') continue; // a blank line does not end a list
      // Any other non-blank line ends runs at or deeper than its own indent;
      // a more-indented line is an item's continuation and leaves the run alone.
      const indent = line.match(/^(\s*)/)[1].length;
      for (const k of [...runs.keys()]) if (k >= indent) runs.delete(k);
    }
  }
}

if (errors.length) {
  console.error('QEP checks failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log('QEP checks passed.');
