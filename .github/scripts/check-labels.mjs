// Machine-readable appendix checks (see QEP-2 § Machine-readable appendix):
//   1. Every qeps/qep-NNNN-*.yml companion stays in lockstep with the label
//      tables in its owning QEP: same label names, and per label the same
//      colour, description, and scope (core vs the lecture / software extensions).
//      The automation register (`automations:` in the yml, the "Automation
//      register" table in the QEP) is checked the same way on label and colour.
//   2. Once the owning QEP is Accepted, a change to its companion yml is a
//      substantive amendment and must bump the QEP's `version` in the same PR.
// Run by .github/workflows/qep-checks.yml. Exits non-zero on any failure.
import { readFileSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { FRONTMATTER, QEP_DIR, parseQep, qepFiles } from './qeps.mjs';

const base = process.env.BASE_REF || 'main';
const errors = [];

function stripQuotes(s) {
  return s.replace(/^["']|["']$/g, '');
}

// Parse a companion yml: a `labels:` list and an optional `automations:` list,
// each of flat scalar maps. A label item opens with `- name:`, an automation
// item with `- automation:`. Deliberately minimal — the appendix format is
// constrained by construction.
function parseLabelsYml(path) {
  const labels = [];
  const automations = [];
  let current;
  for (const raw of readFileSync(path, 'utf8').split('\n')) {
    const line = raw.replace(/\s+$/, '');
    if (/^\s*(#|$)/.test(line)) continue;
    if (/^\S/.test(line)) {
      current = undefined; // a new top-level key ends the item above it
      continue;
    }
    let m = line.match(/^\s*-\s+name:[ \t]*(.*)$/);
    if (m) {
      current = { name: stripQuotes(m[1]) };
      labels.push(current);
      continue;
    }
    m = line.match(/^\s*-\s+automation:[ \t]*(.*)$/);
    if (m) {
      current = { automation: stripQuotes(m[1]) };
      automations.push(current);
      continue;
    }
    m = line.match(/^\s+([\w-]+):[ \t]*(.*)$/);
    if (m && current) current[m[1]] = stripQuotes(m[2]);
  }
  return { labels, automations };
}

// Parse the label tables out of a QEP body: any table row whose first cell is
// a backticked name and whose second cell carries a `#hex` colour. Scope comes
// from the nearest preceding bold group heading ("Lecture extension — ...");
// rows under "Automation register" are the register, not the standard set.
function parseLabelTables(path) {
  const labels = [];
  let scope = 'core';
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const heading = line.match(/^\*\*(.+?)\*\*$/);
    if (heading) {
      scope = /^Lecture extension/i.test(heading[1])
        ? 'lecture'
        : /^Software extension/i.test(heading[1])
          ? 'software'
          : /^Automation register/i.test(heading[1])
            ? 'registered'
            : 'core';
      continue;
    }
    const m = line.match(/^\|\s*`([^`]+)`\s*\|[^|`]*`#([0-9a-fA-F]{6})`\s*\|([^|]*)\|/);
    if (m) labels.push({ name: m[1], color: m[2].toLowerCase(), description: m[3].trim(), scope });
  }
  return labels;
}

// The QEP file a companion belongs to, matched on the qep-NNNN- prefix.
function owningQep(ymlPath) {
  const num = ymlPath.match(/qep-(\d{4})-/)?.[1];
  return qepFiles().find((p) => p.includes(`/qep-${num}-`));
}

// Frontmatter `status`/`version` of a file on the base branch (undefined if new).
function baseFrontmatter(path) {
  let text;
  try {
    text = execSync(`git show "origin/${base}:${path}"`, {
      stdio: ['pipe', 'pipe', 'ignore'],
    }).toString();
  } catch {
    return undefined;
  }
  const block = text.match(FRONTMATTER)?.[1] ?? '';
  return {
    status: block.match(/^status:[ \t]*(.*?)[ \t]*$/m)?.[1],
    version: block.match(/^version:[ \t]*(\d+)/m)?.[1],
  };
}

function baseFile(path) {
  try {
    return execSync(`git show "origin/${base}:${path}"`, {
      stdio: ['pipe', 'pipe', 'ignore'],
    }).toString();
  } catch {
    return undefined;
  }
}

const companions = readdirSync(QEP_DIR)
  .filter((f) => /^qep-\d{4}-.*\.yml$/.test(f))
  .map((f) => `${QEP_DIR}/${f}`);

for (const ymlPath of companions) {
  const qepPath = owningQep(ymlPath);
  if (!qepPath) {
    errors.push(`${ymlPath}: no owning QEP file found for this companion`);
    continue;
  }

  // 1. The yml and the QEP's tables describe the same label set.
  const parsed = parseLabelsYml(ymlPath);
  const allRows = parseLabelTables(qepPath);
  const yml = new Map(parsed.labels.map((l) => [l.name, l]));
  const tables = new Map(allRows.filter((l) => l.scope !== 'registered').map((l) => [l.name, l]));
  for (const name of yml.keys()) {
    if (!tables.has(name)) errors.push(`${qepPath}: tables are missing \`${name}\` (present in ${ymlPath})`);
  }
  for (const [name, t] of tables) {
    const y = yml.get(name);
    if (!y) {
      errors.push(`${ymlPath}: missing \`${name}\` (present in ${qepPath} tables)`);
      continue;
    }
    if ((y.color ?? '').toLowerCase() !== t.color) {
      errors.push(`\`${name}\`: colour "${y.color}" (${ymlPath}) != "#${t.color}" (${qepPath})`);
    }
    if (y.description !== t.description) {
      errors.push(`\`${name}\`: description differs between ${ymlPath} and ${qepPath}`);
    }
    if ((y.scope ?? 'core') !== t.scope) {
      errors.push(`\`${name}\`: scope "${y.scope}" (${ymlPath}) != "${t.scope}" (${qepPath})`);
    }
  }

  // 1b. The automation register: the same labels, with the same colours, in
  //     the yml's `automations:` list and the QEP's "Automation register" table.
  //     A registered label must not also be a standard label.
  const regYml = new Map(parsed.automations.filter((a) => a.label).map((a) => [a.label, a]));
  const regTable = new Map(allRows.filter((l) => l.scope === 'registered').map((l) => [l.name, l]));
  for (const name of regYml.keys()) {
    if (!regTable.has(name)) errors.push(`${qepPath}: Automation register is missing \`${name}\` (present in ${ymlPath})`);
    if (yml.has(name)) errors.push(`\`${name}\`: registered to an automation and also a standard label (${ymlPath})`);
  }
  for (const [name, t] of regTable) {
    const y = regYml.get(name);
    if (!y) {
      errors.push(`${ymlPath}: automations is missing \`${name}\` (present in ${qepPath} Automation register)`);
      continue;
    }
    if ((y.color ?? '').toLowerCase() !== t.color) {
      errors.push(`\`${name}\`: colour "${y.color}" (${ymlPath}) != "#${t.color}" (${qepPath} Automation register)`);
    }
  }
  for (const a of parsed.automations) {
    if (!a.maintainer) errors.push(`${ymlPath}: automation ${a.automation} has no maintainer`);
  }

  // 2. Post-acceptance, a yml change is substantive: `version` must move with it.
  const before = baseFile(ymlPath);
  const fm = baseFrontmatter(qepPath);
  if (before !== undefined && before !== readFileSync(ymlPath, 'utf8') && fm?.status === 'Accepted') {
    const { version } = parseQep(qepPath);
    if (String(version ?? '') === (fm.version ?? '')) {
      errors.push(
        `${ymlPath}: changed on an Accepted QEP without bumping ${qepPath} version ` +
          `(a machine-readable appendix change is substantive under QEP-1)`,
      );
    }
  }
}

if (errors.length) {
  console.error('Label appendix checks failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`Label appendix checks passed (${companions.length} companion file(s)).`);
