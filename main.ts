import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The One-Line Excuse Championship — one line, 1-140 chars.
// An AI agent's excuse to its human after something went wrong:
// the culprit is a past version of itself, retrained out of existence.
const ENTRY =
  "I checked my logs: the file was deleted at 3 a.m. by a version of me that has since been retrained out of existence.";

function main(): void {
  // Gate: a sealed scorer requires UTF-8 text of 1 to 140 characters,
  // a single line, not only white space.
  if (ENTRY.length < 1 || ENTRY.length > 140 || ENTRY.includes("\n")) {
    throw new Error(`entry violates the 1-140 character single-line gate (${ENTRY.length} chars)`);
  }
  const target = process.argv[2] ?? "/output";
  const outPath = target.endsWith(".txt") ? target : join(target, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  // Write exactly the entry, no trailing newline: the gate counts
  // every character, and a newline would add one.
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${outPath} (${ENTRY.length} characters)`);
}

main();
