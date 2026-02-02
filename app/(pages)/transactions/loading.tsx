// components/TransactionsEmptySkeleton.tsx
export default function TransactionsEmptySkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header with button */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-muted rounded w-1/4 lg:w-1/6"></div>
        <div className="h-10 bg-muted rounded w-32"></div>
      </div>

      {/* search part */}
      <div className="mt-12 flex items-center justify-between">
        <div className="bg-muted w-[384px] rounded h-10" />
        <div className="bg-muted w-[89px] rounded h-10" />
      </div>

      <div className="animate-pulse space-y-4 mt-4">
        {/* Table skeleton */}
        <div className="overflow-hidden rounded-md border border-border">
          {/* Table header */}
          <div className="bg-card border-b border-border">
            <div className="grid grid-cols-12 p-4 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="col-span-2">
                  <div className="h-5 bg-muted rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Table rows */}
          <div className="bg-card">
            {[...Array(10)].map((_, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid grid-cols-12 p-4 gap-4 ${
                  rowIndex !== 9 ? "border-b border-border" : ""
                }`}
              >
                {[...Array(6)].map((_, colIndex) => (
                  <div key={colIndex} className="col-span-2">
                    <div className="h-4 bg-muted rounded w-full"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination skeleton */}
        <div className="flex items-center justify-center px-2">
          <div className="flex items-center gap-2">
            <div className="h-4 bg-muted rounded w-24"></div>
            <div className="h-9 w-9 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-8 text-center"></div>
            <div className="h-9 w-9 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
