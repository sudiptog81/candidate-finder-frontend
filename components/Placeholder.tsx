export default function Placeholder({ text }: { text: string }) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-3xl border border-dashed border-line-strong bg-white/40 p-10 text-center">
      <p className="font-display mt-4 text-xl text-ink-soft">{text}</p>
    </div>
  );
}
