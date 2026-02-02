// components/BudgetsSkeleton.tsx
export default function BudgetsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header with button */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-muted rounded w-1/4 lg:w-1/6"></div>
        <div className="h-10 bg-muted rounded w-32"></div>
      </div>

      {/* Main content area */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-9 space-y-2 md:space-y-0 md:gap-4">
        {/* Left column - Chart/Stats section */}
        <div className="grid col-span-1 md:col-span-4 lg:col-span-3 h-fit">
          <div className="bg-card rounded-lg p-6 border border-border">
            {/* Chart header */}
            <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>

            {/* Donut chart skeleton */}
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative">
                {/* Outer circle */}
                <div className="h-48 w-48 rounded-full bg-muted mb-4"></div>
                {/* Inner circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-card"></div>
              </div>

              {/* Stats below chart */}
              <div className="w-full space-y-4 mt-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-muted"></div>
                      <div className="h-4 bg-muted rounded w-20"></div>
                    </div>
                    <div className="h-4 bg-muted rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Budgets list */}
        <div className="grid col-span-1 md:col-span-5 lg:col-span-6 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-lg p-6 border border-border"
            >
              {/* Budget header */}
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-2">
                  <div className="h-6 bg-muted rounded w-40"></div>
                  <div className="h-4 bg-muted rounded w-32"></div>
                </div>
                <div className="h-8 bg-muted rounded w-20"></div>
              </div>

              {/* Progress bar */}
              <div className="space-y-2 mb-6">
                <div className="h-2 w-full bg-muted rounded-full"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-muted rounded w-20"></div>
                  <div className="h-4 bg-muted rounded w-24"></div>
                </div>
              </div>

              {/* Transaction list */}
              <div className="space-y-3">
                <div className="h-5 bg-muted rounded w-1/4 mb-3"></div>
                {[...Array(3)].map((_, j) => (
                  <div
                    key={j}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-24"></div>
                        <div className="h-3 bg-muted rounded w-16"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-muted rounded w-20"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
