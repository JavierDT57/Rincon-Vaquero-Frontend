import React from "react";
import clsx from "clsx";

export function Badge({ children, className }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mt-2",
        className
      )}
    >
      {children}
    </span>
  );
}
