function Card({ children, className = "", hover = false }) {
  return (
    <div
      className={`
        bg-white rounded-xl
        border border-gray-100
        shadow-sm
        mt-4
        ${
          hover
            ? "transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            : ""
        }
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
