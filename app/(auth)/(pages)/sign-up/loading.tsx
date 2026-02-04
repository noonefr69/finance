export default function SignInSkeleton() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="w-full mx-5 lg:m-0 sm:max-w-md animate-pulse bg-card rounded-lg shadow">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="h-7 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-3 pt-4">
            <div className="h-10 bg-muted rounded flex-1"></div>
            <div className="h-10 bg-muted rounded flex-1"></div>
          </div>

          {/* Divider */}
          <div className="my-6">
            <div className="h-px bg-border"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>

          {/* Footer Link */}
          <div className="pt-4">
            <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
