import path from "node:path";
import { readFile } from "node:fs/promises";
import { buildIndex, rowToCandidate, type CandidateIndex } from "./candidates";
import { parseCsv } from "./parseCsv";

export async function loadCandidatesFromLocalFile(): Promise<CandidateIndex> {
  const filePath = path.join(process.cwd(), "data", "data.csv");
  const text = await readFile(filePath, "utf8");
  const rows = parseCsv(text);
  const candidates = rows.map(rowToCandidate);
  return buildIndex(candidates);
}
