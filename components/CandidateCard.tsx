import Avatar from "./Avatar";
import Field from "./Field";
import { type Candidate } from "@/lib/candidates";

function statusStyle(status: string): { label: string; className: string } {
  const s = status.toUpperCase();
  if (s === "SITTING")
    return {
      label: "Sitting",
      className: "bg-green-soft text-green border border-[color:var(--green)]/25",
    };
  if (s === "DEFEATED")
    return {
      label: "Not in office",
      className: "bg-[#f0e6e2] text-[#8a3b22] border border-[#8a3b22]/20",
    };
  return {
    label: status || "—",
    className: "bg-[color:var(--white-2)] text-ink-soft border border-line",
  };
}

export default function CandidateCard({ candidate }: { candidate: Candidate }) {
  const status = statusStyle(candidate.status);
  return (
    <article
      key={`${candidate.state}-${candidate.constituency}`}
      className="rise relative overflow-hidden rounded-3xl border border-line bg-white p-6 sm:p-8"
    >
      <header className="flex items-start gap-5">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider"
              style={{
                backgroundColor: candidate.color ? `${candidate.color}1a` : "var(--saffron-soft)",
                color: candidate.color ?? "var(--saffron)",
              }}
            >
              {candidate.party || "Independent"}
            </span>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${status.className}`}>
              {status.label}
            </span>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-soft border border-line`}>
                {candidate.state}
            </span>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-soft border border-line`}>
                {candidate.constituency}
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-start items-center">
            <Avatar candidate={candidate} />
              <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                {candidate.name}
              </h2>
          </div>
        </div>
      </header>

      {candidate.bio && (
        <p className="mt-6 border-l-2 border-[color:var(--saffron)] pl-4 text-[15px] leading-relaxed text-ink-soft">
          {candidate.bio}
        </p>
      )}

      <dl className="mt-7 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        {candidate.termsList.length > 0 && (
          <Field label="Lok Sabha Terms">
            <div className="flex flex-wrap gap-1.5">
              {candidate.termsList.map((t) => (
                <span key={t} className="border border-line text-sm font-medium px-1.5 py-0.5 rounded cursor-pointer text-ink-soft">
                  {t}
                </span>
              ))}
            </div>
          </Field>
        )}

        {candidate.emails.length > 0 && (
          <Field label="Email">
            <ul className="space-y-1">
              {candidate.emails.map((e) => (
                <li key={e}>
                  <a href={`mailto:${e}`} className="break-all text-navy underline decoration-navy/30 underline-offset-2 transition-colors hover:decoration-navy">
                    {e}
                  </a>
                </li>
              ))}
            </ul>
          </Field>
        )}

        {candidate.phone && (
          <Field label="Phone">
            <span className="text-ink-soft">{candidate.phone}</span>
          </Field>
        )}
      </dl>
    </article>
  );
}
