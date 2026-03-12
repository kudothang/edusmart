import type { ReactNode } from "react"


interface GridProps {
  children: ReactNode
  cols?: string
}

export default function Grid({ children, cols }: GridProps) {
  return (
    <div
      className={
        cols ??
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      }
    >
      {children}
    </div>
  )
}