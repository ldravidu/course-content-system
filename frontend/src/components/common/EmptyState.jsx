function EmptyState({ message, children }) {
  return (
    <div className="text-center py-10">
      <p className="text-gray-500 mb-4">{message}</p>
      {children}
    </div>
  );
}

export default EmptyState;
