// Shared helpers for QEP CI: parse QEP frontmatter and the README index table.
// Used by stamp.mjs (post-merge stamp + README sync) and check.mjs (PR checks).
import { readFileSync, readdirSync } from 'node:fs';

export const QEP_DIR = 'qeps';
export const README = 'README.md';

// Every qeps/qep-XXXX-slug.md file, sorted by name (so by QEP number).
export function qepFiles() {
  return readdirSync(QEP_DIR)
    .filter((f) => /^qep-\d{4}-.*\.md$/.test(f))
    .sort()
    .map((f) => `${QEP_DIR}/${f}`);
}

// The leading YAML frontmatter block. Exported so the stamp/check scripts can
// scope their version parsing to it — a QEP *body* may contain literal
// `version:`/`version-hash:` lines inside a YAML example, which must be ignored.
export const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/;

function field(block, name) {
  const m = block.match(new RegExp(`^${name}:[ \\t]*(.*?)[ \\t]*$`, 'm'));
  return m ? m[1] : undefined;
}

function stripQuotes(s) {
  return s === undefined ? undefined : s.replace(/^["']|["']$/g, '');
}

// Parse the fields we care about from a QEP file's YAML frontmatter.
// `version` is a plain number (undefined = implicitly v0); `hash` is the stamped
// short SHA from the sibling `version-hash` field (undefined when not yet stamped).
export function parseQep(path) {
  const text = readFileSync(path, 'utf8');
  const fm = text.match(FRONTMATTER);
  if (!fm) throw new Error(`${path}: missing YAML frontmatter`);
  const block = fm[1];

  const rawVersion = field(block, 'version');
  let version;
  if (rawVersion !== undefined && rawVersion !== '') {
    const v = rawVersion.match(/^(\d+)$/);
    if (!v) throw new Error(`${path}: malformed "version: ${rawVersion}"`);
    version = Number(v[1]);
  }

  // Optional `related: [N, ...]` — QEPs this one is paired with. The header
  // table's **Related** row is the primary human record; check.mjs keeps the
  // two in lockstep. Editing `related` is editorial (no normative content).
  const rawRelated = field(block, 'related');
  let related;
  if (rawRelated !== undefined && rawRelated !== '') {
    const r = rawRelated.match(/^\[([0-9,\s]*)\]$/);
    if (!r) throw new Error(`${path}: malformed "related: ${rawRelated}" (expected e.g. [2, 4])`);
    related = r[1].split(',').map((s) => s.trim()).filter(Boolean).map(Number);
  }

  // `version-hash` may carry a trailing "# stamped by CI" signpost comment.
  const rawHash = field(block, 'version-hash');
  let hash;
  if (rawHash !== undefined && rawHash !== '') {
    const h = rawHash.match(/^([0-9a-fA-F]+)(?:[ \t]*#.*)?$/);
    if (!h) throw new Error(`${path}: malformed "version-hash: ${rawHash}"`);
    hash = h[1];
  }

  const qep = field(block, 'qep');
  return {
    path,
    qep: qep === undefined ? undefined : Number(qep),
    title: stripQuotes(field(block, 'title')),
    status: stripQuotes(field(block, 'status')),
    type: stripQuotes(field(block, 'type')),
    related,
    version,
    hash,
  };
}

// How `version` is displayed in the README Version column.
export function versionCell(version) {
  return version === undefined ? '–' : `v${version}`;
}

// --- README index table ---------------------------------------------------
// The Markdown table under the "## Index" heading: its first column links each
// QEP file. Column positions are read from the header row, so the column order
// can change without touching this code.

function splitRow(line) {
  // "| a | b |" -> ["a", "b"]
  return line
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map((c) => c.trim());
}

export function readIndex() {
  const text = readFileSync(README, 'utf8');
  const lines = text.split('\n');
  const start = lines.findIndex((l) => /^\|\s*QEP\s*\|/i.test(l));
  if (start === -1) throw new Error(`${README}: no index table header (| QEP | ...) found`);
  const header = splitRow(lines[start]);
  const col = (name) => header.findIndex((c) => c.toLowerCase() === name);
  const cols = {
    qep: col('qep'),
    title: col('title'),
    type: col('type'),
    status: col('status'),
    version: col('version'),
  };

  // `end` is the first line after the table body, so the body is exactly
  // lines[start + 2 .. end). renderIndex() replaces that span wholesale, which
  // is why the bound is tracked rather than just the rows that parsed.
  const rows = [];
  let end = start + 2;
  for (let i = start + 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trimStart().startsWith('|')) break; // table ended
    end = i + 1;
    const m = line.match(/qep-(\d+)-/);
    if (!m) continue;
    rows.push({ index: i, cells: splitRow(line), qep: Number(m[1]) });
  }
  return { lines, cols, rows, start, end, header };
}

// The index row a QEP's frontmatter implies. Column ORDER comes from the table
// header, so a reordered or extended table needs no change here; a column this
// function does not know about is left empty rather than guessed at. `width` is
// the header's own column count, so an unknown column at the END of the table is
// emitted empty like any other rather than dropped off the row.
export function buildRow(q, cols, width = Math.max(...Object.values(cols)) + 1) {
  const cells = new Array(Math.max(width, Math.max(...Object.values(cols)) + 1)).fill('');
  const put = (i, v) => {
    if (i !== -1) cells[i] = v;
  };
  put(cols.qep, `[QEP-${q.qep}](${q.path})`);
  put(cols.title, q.title ?? '');
  put(cols.type, q.type ?? '');
  put(cols.status, q.status ?? '');
  put(cols.version, versionCell(q.version));
  return cells;
}

// The whole index body, rebuilt from frontmatter and ordered by QEP number.
// Returns the new `lines` array; the caller decides whether to write it.
// This is the generated-index rule: the table is derived, never hand-edited,
// so a PR need not carry its own row and two PRs cannot collide on one line.
export function renderIndex(idx, qeps) {
  const body = [...qeps]
    .filter((q) => q.qep !== undefined)
    .sort((a, b) => a.qep - b.qep)
    .map((q) => formatRow(buildRow(q, idx.cols, idx.header.length)));
  return [...idx.lines.slice(0, idx.start + 2), ...body, ...idx.lines.slice(idx.end)];
}

// Rebuild a single-spaced Markdown row from its trimmed cells.
export function formatRow(cells) {
  return `| ${cells.join(' | ')} |`;
}
