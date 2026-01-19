
export function Button({ className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md text-sm font-medium border bg-black text-white hover:bg-gray-800 ${className}`}
    />
  );
}
