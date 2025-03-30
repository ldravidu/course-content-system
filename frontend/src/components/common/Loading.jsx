function Loading({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

export default Loading;
