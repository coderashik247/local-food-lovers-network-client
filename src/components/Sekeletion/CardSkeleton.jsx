import React from "react";

const CardSkeleton = () => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg animate-pulse bg-gray-100">
      {/* Image Skeleton */}
      <div className="h-64 bg-gray-300"></div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-2">
        {/* Restaurant & Location */}
        <div className="flex justify-between items-center text-sm">
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
          <div className="w-20 h-4 bg-gray-300 rounded"></div>
        </div>

        {/* Food Name */}
        <div className="w-32 h-6 bg-gray-300 rounded mt-2"></div>

        {/* Description */}
        <div className="w-full h-12 bg-gray-300 rounded mt-1"></div>

        {/* Reviewer & Rating */}
        <div className="flex justify-between mt-2">
          <div className="w-20 h-4 bg-gray-300 rounded"></div>
          <div className="w-12 h-4 bg-gray-300 rounded"></div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <div className="flex-1 h-8 bg-gray-300 rounded"></div>
          <div className="flex-1 h-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
