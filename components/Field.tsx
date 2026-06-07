export default function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase text-muted">
        {label}
      </dt>
      <dd className="mt-1 text-[15px] text-ink">{children}</dd>
    </div>
  );
}
