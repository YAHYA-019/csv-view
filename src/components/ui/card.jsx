
export function Card({ className = "", children }) {
  return <div className={`rounded-xl border bg-white ${className}`}>{children}</div>;
}

export function CardContent({ className = "", children }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}
