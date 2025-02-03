import ImagesUploader from "./Components/ImagesUploader";

const App = () => {
  return (
    <div
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 md:px-6"
      dir="rtl"
    >
      <div className="w-full max-w-7xl bg-white rounded-lg p-8">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-6">
          رفع الصور والفريم
        </h1>

        <div className="bg-white w-full p-6">
          <ImagesUploader />
        </div>
      </div>

      <footer className="my-8 text-gray-500 text-center text-base">
        Powered by{" "}
        <a
          target="_blank"
          href="https://www.linkedin.com/in/zeyad-hyman-7a5968347"
          className="text-gray-700 font-semibold hover:underline"
        >
          Zeyad Hyman
        </a>
      </footer>
    </div>
  );
};

export default App;
