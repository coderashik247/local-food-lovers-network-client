import React from "react";

const CardDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 space-y-6 animate-pulse">
      {/* Back button placeholder */}
      <div className="w-32 h-6 bg-gray-300 rounded"></div>

      <div className="md:flex md:items-start md:gap-10">
        {/* Image */}
        <div className="md:w-2/5 w-full rounded-2xl overflow-hidden bg-gray-300 h-96" />

        {/* Details */}
        <div className="md:w-3/5 mt-6 md:mt-0 space-y-6">
          {/* Reviewer Info */}
          <div className="bg-gray-200 rounded-xl p-6 flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gray-300" />
              <div className="space-y-2">
                <div className="w-32 h-5 bg-gray-300 rounded"></div>
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="w-28 h-5 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Food Info */}
          <div className="bg-gray-200 rounded-xl p-6 flex justify-between items-center flex-wrap gap-4">
            <div className="space-y-2">
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
              <div className="w-28 h-5 bg-gray-300 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="w-20 h-4 bg-gray-300 rounded"></div>
              <div className="w-16 h-5 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Review Text */}
          <div className="bg-gray-200 rounded-xl p-6 space-y-2">
            <div className="w-24 h-5 bg-gray-300 rounded"></div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-300 rounded"></div>
              <div className="w-full h-4 bg-gray-300 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsSkeleton;
