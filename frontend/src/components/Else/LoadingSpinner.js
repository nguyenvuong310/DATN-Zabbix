const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center space-x-4 bg-black bg-opacity-50 z-50">
    <div className="w-16 h-16 border-8 border-t-8 border-t-green-600 border-gray-200 rounded-full animate-spin"></div>
    <text className="text-xl font-semibold font-be-vietnam-pro text-white">Đang xử lí...</text>
  </div>
);

export default LoadingSpinner;
