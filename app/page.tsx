import CandidateFinder from "@/components/CandidateFinder";
import { loadCandidatesFromLocalFile } from "@/lib/candidates.server";

export default async function Home() {
  const index = await loadCandidatesFromLocalFile();

  return (
    <main className="relative z-10 mx-auto flex min-h-dvh max-w-3xl flex-col px-5 py-12 sm:px-8 sm:py-16">  
      <div className="lg:mt-10 mt-0 flex-1">
        <CandidateFinder index={index} />
      </div>
    </main>
  );
}
