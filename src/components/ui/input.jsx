
export function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`border rounded-md px-3 py-2 text-sm w-full ${className}`}
    />
  );
}
