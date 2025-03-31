function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  error,
  className = "",
  icon,
  component = "input",
  ...props
}) {
  const inputClasses = `
    w-full
    ${icon ? "pl-10" : "px-4"} py-2
    bg-white
    border border-gray-200
    rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
    placeholder-gray-400
    ${error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : ""}
  `;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        {component === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={inputClasses}
            {...props}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={inputClasses}
            {...props}
          />
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default Input;
