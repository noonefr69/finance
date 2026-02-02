export default function HomeSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-muted rounded-lg h-38"></div>
        ))}
      </div>

      <div className="columns-1 lg:columns-2 space-y-4 mt-10">
        {/* Pots Skeleton */}
        <div className="bg-card rounded-lg p-6 break-inside-avoid border border-border">
          <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-24"></div>
                  <div className="h-3 bg-muted rounded w-16"></div>
                </div>
                <div className="h-4 bg-muted rounded w-12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Budgets Skeleton */}
        <div className="bg-card rounded-lg p-6 break-inside-avoid border border-border">
          <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 bg-muted rounded w-32"></div>
                  <div className="h-4 bg-muted rounded w-16"></div>
                </div>
                <div className="h-2 bg-muted rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions Skeleton */}
        <div className="bg-card rounded-lg p-6 break-inside-avoid border border-border">
          <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-muted rounded-full"></div>
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

        {/* Recurring Bills Skeleton */}
        <div className="bg-card rounded-lg p-6 break-inside-avoid border border-border">
          <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-28"></div>
                  <div className="h-3 bg-muted rounded w-20"></div>
                </div>
                <div className="h-4 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
