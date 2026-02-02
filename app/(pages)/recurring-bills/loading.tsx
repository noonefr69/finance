// components/RecurringBillsSkeleton.tsx
export default function RecurringBillsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-muted rounded w-1/3 lg:w-1/4"></div>
      </div>

      {/* Main content - two column layout */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-9 gap-4">
        {/* Left column - Stats cards */}
        <div className="col-span-1 md:col-span-3 space-y-4">
          {/* HeaderCardBills skeleton */}
          <div className="bg-card rounded-lg p-6 py-7 border border-border space-y-4">
            <div className="h-6 bg-muted rounded w-1/2"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-4 bg-muted rounded w-20"></div>
                  <div className="h-5 bg-muted rounded w-24"></div>
                </div>
              ))}
            </div>
          </div>

          {/* FooterCardBills skeleton */}
          <div className="bg-card rounded-lg p-6 py-9 border border-border space-y-4">
            <div className="h-6 bg-muted rounded w-1/2"></div>
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center gap-10">
                  <div className="h-10 w-10 bg-muted rounded-full"></div>
                  <div className="space-y-8 flex-1">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                  <div className="h-5 bg-muted rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - DataTable */}
        <div className="col-span-1 md:col-span-6">
          {/* Table search and controls */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-10 bg-muted rounded w-64 max-w-sm"></div>
            <div className="h-10 bg-muted rounded w-24 ml-auto"></div>
          </div>

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
              {[...Array(6)].map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`grid grid-cols-12 p-4 gap-4 ${
                    rowIndex !== 5 ? "border-b border-border" : ""
                  }`}
                >
                  {/* Bill name */}
                  <div className="col-span-3 space-y-1">
                    <div className="h-4 bg-muted rounded w-32"></div>
                    <div className="h-3 bg-muted rounded w-24"></div>
                  </div>

                  {/* Amount */}
                  <div className="col-span-2">
                    <div className="h-5 bg-muted rounded w-20 ml-auto"></div>
                  </div>

                  {/* Frequency */}
                  <div className="col-span-2">
                    <div className="h-6 bg-muted rounded-full w-16"></div>
                  </div>

                  {/* Due date */}
                  <div className="col-span-2 space-y-1">
                    <div className="h-4 bg-muted rounded w-16"></div>
                    <div className="h-3 bg-muted rounded w-12"></div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <div className="h-6 bg-muted rounded-full w-20"></div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex gap-1">
                    <div className="h-6 w-6 bg-muted rounded"></div>
                    <div className="h-6 w-6 bg-muted rounded"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Table footer */}
            <div className="flex items-center justify-between p-4 bg-card border-t border-border">
              <div className="h-4 bg-muted rounded w-32"></div>
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 bg-muted rounded"></div>
                <div className="flex items-center gap-2">
                  <div className="h-4 bg-muted rounded w-4"></div>
                  <div className="h-4 bg-muted rounded w-4"></div>
                  <div className="h-4 bg-muted rounded w-4"></div>
                </div>
                <div className="h-9 w-9 bg-muted rounded"></div>
              </div>
              <div className="h-4 bg-muted rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
