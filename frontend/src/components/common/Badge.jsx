function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
