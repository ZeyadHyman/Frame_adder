import ImagesUploader from "./Components/ImagesUploader";

const App = () => {
  return (
    <div
      className="md:px-6 md:py-12 bg-gray-100 min-h-screen flex md:justify-center md:items-center"
      dir="rtl"
    >
      <div className="w-full max-w-7xl bg-white rounded-lg p-8">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          رفع الصور والفريم
        </h1>

        <div className="bg-white w-full p-6">
          <ImagesUploader />
        </div>
      </div>
    </div>
  );
};

export default App;

