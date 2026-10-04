export default function Loading() {
  return (
    <div className="space-y-8" role="status" aria-label="페이지를 불러오는 중">
      <div className="h-40 animate-pulse rounded-3xl bg-card" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-64 animate-pulse rounded-2xl bg-card" />
        ))}
      </div>
    </div>
  );
}
