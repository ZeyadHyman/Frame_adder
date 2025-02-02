import { useState } from "react";
import FrameUploader from "./FrameUploader";
import JSZip from "jszip";
import FileSaver from "file-saver";

function ImagesUploader() {
  const [images, setImages] = useState([]);
  const [frame, setFrame] = useState(null);
  const [frameHeight, setFrameHeight] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);

      const img = new Image();
      img.onload = () => {
        newImages.push({ imageUrl, width: img.width, height: img.height });

        if (newImages.length === files.length) {
          setImages((prevImages) => [...prevImages, ...newImages]);
        }
      };
      img.src = imageUrl;
    }
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleDeleteAllImages = () => {
    setImages([]);
  };

  const handleDownloadAll = () => {
    setIsLoading(true); // Show loader
    const zip = new JSZip();
    let downloadCount = 0;

    images.forEach((image, index) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.src = image.imageUrl;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        if (frame) {
          const frameImg = new Image();
          frameImg.src = frame;
          frameImg.onload = () => {
            // Maintain the aspect ratio of the frame
            const frameAspectRatio = frameImg.width / frameImg.height;
            const frameWidth = img.width; // Match the image width
            const frameHeight = frameWidth / frameAspectRatio; // Scale height proportionally

            // Resize canvas to fit both image and frame
            canvas.height = img.height + frameHeight;

            // Redraw image
            ctx.drawImage(img, 0, 0);

            // Draw frame at the bottom of the image
            ctx.drawImage(frameImg, 0, img.height, frameWidth, frameHeight);

            // Use canvas.toBlob to avoid re-compressing unnecessarily
            canvas.toBlob(
              (blob) => {
                // Instead of adding extra compression, use the original quality
                zip.file(`image-${index + 1}.jpg`, blob);
                downloadCount++;

                if (downloadCount >= images.length) {
                  zip.generateAsync({ type: "blob" }).then((content) => {
                    FileSaver.saveAs(content, "images.zip");
                    setIsLoading(false); // Hide loader after download is complete
                  });
                }
              },
              "image/jpeg",
              1.0
            );
          };
        } else {
          alert("يرجى إضافة الفريم أولاً!");
        }
      };
    });
  };

  return (
    <div className="w-full flex flex-col">
      <FrameUploader setFrame={setFrame} setFrameHeight={setFrameHeight} />
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">الصور</h2>

      <input
        type="file"
        onChange={handleFileChange}
        multiple
        className="block w-full border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 p-2 mb-4 bg-gray-50 text-gray-900"
      />

      {images.length > 0 && (
        <div>
          <div className="flex justify-between">
            <h2 className="text-xl md:text-2xl font-medium text-gray-800 mb-4">
              الصور المرفوعة:
            </h2>

            <label className="h-10 w-10 flex items-center justify-center pb-2 text-white text-4xl rounded-full bg-red-900 cursor-pointer">
              +
              <input
                multiple
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  loading="lazy"
                  src={image.imageUrl}
                  className="w-full h-48 object-cover rounded-lg shadow-md transition duration-300 transform group-hover:scale-105"
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold h-8 w-8 py-1 px-2 rounded-full opacity-90 hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleDownloadAll}
              className="w-full cursor-pointer bg-green-500 text-white text-base md:text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              تحميل جميع الصور
            </button>
            <button
              onClick={handleDeleteAllImages}
              className="w-full cursor-pointer bg-red-500 text-white text-base md:text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-red-600 transition"
            >
              حذف جميع الصور
            </button>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="w-full h-screen fixed top-0 left-0 bg-gray-200/70 z-50 flex justify-center items-center">
          <div className="spinner-border animate-spin border-t-4 border-red-500 border-solid rounded-full w-12 h-12"></div>
        </div>
      )}
    </div>
  );
}

export default ImagesUploader;
