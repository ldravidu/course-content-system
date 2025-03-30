import Card from "../common/Card";
import Badge from "../common/Badge";

function ContentItem({ item, onDownload }) {
  const getFileIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return (
          <svg className="h-8 w-8 text-red-500" /* ...existing SVG props... */>
            {/* ...existing PDF icon path... */}
          </svg>
        );
      case "video":
        return (
          <svg className="h-8 w-8 text-blue-500" /* ...existing SVG props... */>
            {/* ...existing video icon path... */}
          </svg>
        );
      default:
        return (
          <svg
            className="h-8 w-8 text-green-500" /* ...existing SVG props... */
          >
            {/* ...existing default icon path... */}
          </svg>
        );
    }
  };

  return (
    <Card className="flex items-center">
      <div className="mr-4">{getFileIcon(item.fileType)}</div>
      <div className="flex-grow">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>
      <button
        onClick={() => onDownload(item)}
        className="text-blue-600 hover:text-blue-800"
      >
        Download
      </button>
    </Card>
  );
}

export default ContentItem;
