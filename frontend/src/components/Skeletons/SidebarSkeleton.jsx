import React from "react";

const SidebarSkeleton = () => {
  return (
    <div className="flex-1 overflow-y-auto animate-pulse">
      <div className="space-y-4 p-4">
        {/* User Profile Skeleton */}
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full bg-gray-300" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 bg-gray-300 rounded" />
            <div className="h-3 w-32 bg-gray-300 rounded" />
          </div>
        </div>

        {/* Recent Conversations Skeleton */}
        <div className="space-y-2 mt-6">
          <div className="h-4 w-40 bg-gray-300 rounded" />

          {/* Skeleton chat items */}
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 rounded-lg p-2"
              >
                <div className="h-10 w-10 rounded-full bg-gray-300" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-gray-300 rounded" />
                  <div className="h-3 w-36 bg-gray-300 rounded" />
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <div className="h-3 w-10 bg-gray-300 rounded" />
                  <div className="h-5 w-5 rounded-full bg-gray-300" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarSkeleton;
