import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

function CreateCourseModal({ onClose, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    courseCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Course Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Input
            label="Course Code"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            required
            placeholder="e.g., CS101"
          />
          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            component="textarea"
            rows={4}
          />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourseModal;
