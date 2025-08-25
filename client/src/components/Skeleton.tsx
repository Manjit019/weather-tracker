import React, { FC } from "react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700 ${className}`}
      {...props}
    />
  );
}

export default Skeleton ;
