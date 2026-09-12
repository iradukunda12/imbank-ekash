import Card from './ui/Card';
import { Skeleton, SkeletonText } from './ui/Skeleton';

/**
 * Generic placeholder shown for a beat whenever the route changes — stands
 * in for "this page's real data is loading" even though everything here is
 * still mock data with no actual fetch behind it yet. Shaped loosely like
 * the dashboard (header + stat row + two content blocks) since that's
 * close enough to every page's actual layout to read as that page loading,
 * not as a mismatched generic spinner.
 */
export const RouteSkeleton = () => (
  <div className="flex w-full flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8" aria-busy="true" aria-label="Loading page">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-2.5">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-3 w-72" />
      </div>
      <Skeleton className="h-8.5 w-28" />
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="space-y-3.5">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton circle tone="brand" className="h-7 w-7" />
          </div>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-full" />
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="space-y-4 lg:col-span-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-40 w-full" />
      </Card>
      <Card className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <SkeletonText lines={4} />
      </Card>
    </div>
  </div>
);

export default RouteSkeleton;
