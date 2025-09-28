import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonCard() {
  return (
     <SkeletonTheme baseColor="#1f2937" highlightColor="#374151">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="p-4 bg-gray-800 rounded-lg shadow space-y-3">
            <Skeleton height={150} width="100%" />
            <Skeleton height={20} width="80%" />
            <Skeleton height={16} width="60%" />
          </div>
        ))}
      </div>
    </SkeletonTheme>



  );
}