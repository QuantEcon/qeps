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
  const cols = { type: col('type'), status: col('status'), version: col('version') };

  const rows = [];
  for (let i = start + 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trimStart().startsWith('|')) break; // table ended
    const m = line.match(/qep-(\d+)-/);
    if (!m) continue;
    rows.push({ index: i, cells: splitRow(line), qep: Number(m[1]) });
  }
  return { lines, cols, rows };
}

// Rebuild a single-spaced Markdown row from its trimmed cells.
export function formatRow(cells) {
  return `| ${cells.join(' | ')} |`;
}
