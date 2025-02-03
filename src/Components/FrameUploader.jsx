import { useState } from "react";

// eslint-disable-next-line react/prop-types
function FrameUploader({ setFrame, setFrameHeight }) {
  const [framePreview, setFramePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setFramePreview(imageUrl);
    setFrame(imageUrl);

    // Get frame dimensions
    const img = new Image();
    img.onload = () => {
      setFrameHeight(img.height); // Set only the height value
    };
    img.src = imageUrl;
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">الفريم</h2>
      <div className="w-full flex flex-col items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 p-2 mb-4 bg-gray-50 text-gray-900"
        />
      </div>

      {framePreview && (
        <div className="mt-4">
          <img
            src={framePreview}
            alt="Frame Preview"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}

export default FrameUploader;
