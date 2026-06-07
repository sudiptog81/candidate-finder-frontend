import { type Candidate } from "@/lib/candidates";

const HONORIFICS = /^(shri|smt\.?|smt|dr\.?|km\.?|kumari|prof\.?|adv\.?|mr\.?|ms\.?|mrs\.? )\s+/i;

function initials(name: string): string {
  const stripped = name.replace(HONORIFICS, "").trim();
  const parts = stripped.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function hashHue(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
  return h;
}

export default function Avatar({ candidate }: { candidate: Candidate }) {
  const hue = hashHue(candidate.name);
  const bg = candidate.color ?? `hsl(${hue} 45% 42%)`;

  if (candidate.photo) {
    return (
      <img
        src={candidate.photo}
        alt={candidate.name}
        className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-sm ring-1 ring-line"
      />
    );
  }
  return (
    <div
      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl font-display text-2xl font-semibold text-white shadow-sm"
      style={{ backgroundColor: bg }}
      aria-hidden
    >
      {initials(candidate.name)}
    </div>
  );
}
