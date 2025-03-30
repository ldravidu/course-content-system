function Button({
  children,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
  onClick,
}) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-all duration-300 transform";
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm hover:shadow disabled:from-gray-400 disabled:to-gray-500",
    secondary:
      "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 shadow-sm hover:shadow disabled:from-gray-50 disabled:to-gray-100",
    danger:
      "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-sm hover:shadow disabled:from-red-400 disabled:to-red-500",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className} ${
        disabled ? "cursor-not-allowed opacity-75" : "hover:-translate-y-0.5"
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
