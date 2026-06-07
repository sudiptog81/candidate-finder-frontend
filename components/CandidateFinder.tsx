"use client";

import { useMemo, useState } from "react";
import {
  type CandidateIndex,
  getCandidate,
} from "@/lib/candidates";
import CandidateCard from "./CandidateCard";
import Placeholder from "./Placeholder";

export default function CandidateFinder({
  index,
}: {
  index: CandidateIndex;
}) {
  const [state, setState] = useState("");
  const [constituency, setConstituency] = useState("");

  const constituencies = useMemo(
    () => (state ? index.constituenciesByState.get(state) ?? [] : []),
    [index, state]
  );

  const candidate = useMemo(
    () => (state && constituency ? getCandidate(index, state, constituency) : undefined),
    [index, state, constituency]
  );

  function handleStateChange(value: string) {
    setState(value);
    setConstituency("");
  }

  return (
    <div className="space-y-8 sm:space-y-2">
      <header className="space-y-2">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Find Your Representative
        </h1>
        <p className="text-lg text-ink-soft">
          Select your state and constituency to see details about your Lok Sabha representative.
        </p>
      </header>
      <section className="mt-5 rounded-3xl border border-line p-6 sm:p-7">
        <form className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase text-muted">
              State
            </span>
            <div className="relative">
              <select
                className="block w-full appearance-none rounded-xl border border-line bg-white p-2 pr-10 outline-none"
                value={state}
                onChange={(e) => handleStateChange(e.target.value)}
              >
                <option value="">Select a state</option>
                {index.states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </label>

          <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase text-muted">
                Constituency
              </span>
              <div className="relative">
                <select
                    className="block w-full appearance-none rounded-xl border border-line bg-white p-2 pr-10 outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    value={constituency}
                    onChange={(e) => setConstituency(e.target.value)}
                    disabled={!state}
                  >
                  <option value="">Select Constituency</option>
                  {constituencies.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <svg
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
            </div>
          </label>
        </form>
      </section>

      {candidate ? (
        <CandidateCard candidate={candidate} />
      ) : state && constituency ? (
        <Placeholder text="No Representative Found" />
      ) : !state ? (
        <Placeholder text="Select a State" />
      ) : (
        <Placeholder text="Choose a Constituency" />
      )}
    </div>
  );
}
