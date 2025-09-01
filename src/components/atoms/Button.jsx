import React from "react"

export default function Button({ className = "", ...props }) {
  return (
    <button
      className={
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none " +
        "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 " + className
      }
      {...props}
    />
  )
}
