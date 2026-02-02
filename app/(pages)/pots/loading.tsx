export default function PotsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header with button */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-muted rounded w-1/10"></div>
        <div className="h-10 bg-muted rounded w-32"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-muted rounded-lg h-74">
            <div className="animate-pulse">
              <div className="bg-card rounded-lg border border-border p-6">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-muted"></div>
                    <div className="h-6 bg-muted rounded w-32"></div>
                  </div>
                  <div className="h-8 w-8 bg-muted rounded"></div>
                </div>

                {/* Card Content */}
                <div className="space-y-6">
                  {/* Total Saved section */}
                  <div className="flex items-center justify-between">
                    <div className="h-5 bg-muted rounded w-24"></div>
                    <div className="h-10 bg-muted rounded w-32"></div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-3">
                    <div className="h-2 w-full bg-muted rounded-full"></div>
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-muted rounded w-16"></div>
                      <div className="h-4 bg-muted rounded w-28"></div>
                    </div>
                  </div>
                </div>

                {/* Card Footer - Buttons */}
                <div className="flex items-center justify-between mt-8 gap-4">
                  <div className="h-12 bg-muted rounded w-full"></div>
                  <div className="h-12 bg-muted rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
