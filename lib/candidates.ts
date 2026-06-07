export interface Candidate {
  slNo: string;
  name: string;
  party: string;
  constituency: string;
  state: string;
  status: string;
  terms: string;
  termsList: string[];
  phone: string;
  emails: string[];
  photo?: string;
  bio?: string;
  color?: string;
  meta: Record<string, unknown>;
}

function clean(value: string | undefined): string {
  if (!value) return "";
  const v = value.trim();
  return v === "-" ? "" : v;
}

function splitList(value: string): string[] {
  return clean(value)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function rowToCandidate(row: Record<string, string>): Candidate {
  const lookup = (...names: string[]): string => {
    for (const name of names) {
      const hit = Object.keys(row).find(
        (k) => k.toLowerCase() === name.toLowerCase()
      );
      if (hit) return row[hit];
    }
    return "";
  };

  let meta: Record<string, unknown> = {};
  const rawMeta = lookup("Meta", "Metadata", "Extra");
  if (rawMeta) {
    try {
      const parsed = JSON.parse(rawMeta);
      if (parsed && typeof parsed === "object") meta = parsed;
    } catch {
      console.warn(`Failed to parse metadata for ${lookup("Name")}: ${rawMeta}`);
    }
  }

  return {
    slNo: clean(lookup("Sl.No.", "SlNo", "S.No", "Id")),
    name: clean(lookup("Name")),
    party: clean(lookup("Party")),
    constituency: clean(lookup("Constituency")),
    state: clean(lookup("State")),
    status: clean(lookup("Status")),
    terms: clean(lookup("Lok Sabha Terms", "Terms")),
    termsList: splitList(lookup("Lok Sabha Terms", "Terms")),
    phone: clean(lookup("Phone")),
    emails: splitList(lookup("Email", "Emails")),
    photo: (meta.photo as string) || undefined,
    bio: (meta.bio as string) || undefined,
    color: (meta.color as string) || undefined,
    meta,
  };
}

export interface CandidateIndex {
  candidates: Candidate[];
  states: string[];
  constituenciesByState: Map<string, string[]>;
  byStateConstituency: Map<string, Candidate>;
}

const key = (state: string, constituency: string) => `${state}::${constituency}`;

export function buildIndex(candidates: Candidate[]): CandidateIndex {
  const stateSet = new Set<string>();
  const constituenciesByState = new Map<string, string[]>();
  const seenConstituency = new Map<string, Set<string>>();
  const byStateConstituency = new Map<string, Candidate>();

  for (const c of candidates) {
    if (!c.state || !c.constituency) continue;
    stateSet.add(c.state);

    if (!seenConstituency.has(c.state)) {
      seenConstituency.set(c.state, new Set());
      constituenciesByState.set(c.state, []);
    }
    const seen = seenConstituency.get(c.state)!;
    if (!seen.has(c.constituency)) {
      seen.add(c.constituency);
      constituenciesByState.get(c.state)!.push(c.constituency);
    }

    const k = key(c.state, c.constituency);
    if (!byStateConstituency.has(k)) byStateConstituency.set(k, c);
  }

  const collator = new Intl.Collator(undefined, { sensitivity: "base" });
  const states = Array.from(stateSet).sort(collator.compare);
  for (const list of constituenciesByState.values()) {
    list.sort(collator.compare);
  }

  return { candidates, states, constituenciesByState, byStateConstituency };
}

export function getCandidate(
  index: CandidateIndex,
  state: string,
  constituency: string
): Candidate | undefined {
  return index.byStateConstituency.get(key(state, constituency));
}

