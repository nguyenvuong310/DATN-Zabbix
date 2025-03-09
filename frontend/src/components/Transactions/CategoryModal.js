import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";

// Initial options
// Initial options
const initialOptions = {
  "Ăn uống": [
    { value: "Ăn sáng", label: "🍳 Ăn sáng" },
    { value: "Ăn trưa", label: "🍲 Ăn trưa" },
    { value: "Ăn tối", label: "🍛 Ăn tối" },
    { value: "Nhà hàng", label: "🍴 Nhà hàng" },
    { value: "Cà phê", label: "☕ Cà phê" },
    { value: "Đồ ăn vặt", label: "🍿 Đồ ăn vặt" },
    { value: "Quán nhậu", label: "🍻 Quán nhậu" },
    { value: "Đặt món", label: "📦 Đặt món" },
    { value: "Tiệc tùng", label: "🎉 Tiệc tùng" },
    { value: "Nấu ăn tại nhà", label: "🏡 Nấu ăn tại nhà" },
  ],
  "Làm đẹp": [
    { value: "Chăm sóc da", label: "💆 Chăm sóc da" },
    { value: "Trang điểm", label: "💄 Trang điểm" },
    { value: "Cắt tóc", label: "✂️ Cắt tóc" },
    { value: "Mỹ phẩm", label: "💅 Mỹ phẩm" },
    { value: "Spa", label: "🏩 Spa" },
    { value: "Làm móng", label: "💅 Làm móng" },
    { value: "Massage", label: "💆 Massage" },
    { value: "Nước hoa", label: "🌸 Nước hoa" },
    { value: "Dưỡng tóc", label: "💇‍♀️ Dưỡng tóc" },
    { value: "Chăm sóc cơ thể", label: "🧴 Chăm sóc cơ thể" },
  ],
  "Giải trí": [
    { value: "Phim ảnh", label: "🎬 Phim ảnh" },
    { value: "Âm nhạc", label: "🎵 Âm nhạc" },
    { value: "Trò chơi điện tử", label: "🎮 Trò chơi điện tử" },
    { value: "Thể thao", label: "⚽ Thể thao" },
    { value: "Du lịch", label: "✈️ Du lịch" },
    { value: "Sách", label: "📚 Sách" },
    { value: "Hoạt động ngoài trời", label: "🌳 Hoạt động ngoài trời" },
    { value: "Nhà hát", label: "🎭 Nhà hát" },
    { value: "Karaoke", label: "🎤 Karaoke" },
    { value: "Câu lạc bộ đêm", label: "🌃 Câu lạc bộ đêm" },
  ],
  "Mua sắm": [
    { value: "Quần áo", label: "👗 Quần áo" },
    { value: "Giày dép", label: "👠 Giày dép" },
    { value: "Phụ kiện", label: "👜 Phụ kiện" },
    { value: "Đồ điện tử", label: "📱 Đồ điện tử" },
    { value: "Đồ gia dụng", label: "🏡 Đồ gia dụng" },
    { value: "Đồ trang trí", label: "🖼️ Đồ trang trí" },
    { value: "Đồ chơi", label: "🧸 Đồ chơi" },
    { value: "Văn phòng phẩm", label: "🖋️ Văn phòng phẩm" },
    { value: "Thực phẩm", label: "🥫 Thực phẩm" },
    { value: "Hoa", label: "🌸 Hoa" },
  ],
  "Sức khỏe": [
    { value: "Khám bệnh", label: "🩺 Khám bệnh" },
    { value: "Thuốc", label: "💊 Thuốc" },
    { value: "Bảo hiểm", label: "📄 Bảo hiểm" },
    { value: "Chăm sóc răng miệng", label: "🦷 Chăm sóc răng miệng" },
    { value: "Dụng cụ y tế", label: "🩹 Dụng cụ y tế" },
    { value: "Thực phẩm chức năng", label: "🧴 Thực phẩm chức năng" },
    { value: "Tập thể dục", label: "🏋️‍♂️ Tập thể dục" },
    { value: "Yoga", label: "🧘‍♀️ Yoga" },
    { value: "Dinh dưỡng", label: "🍎 Dinh dưỡng" },
    { value: "Khám phụ khoa", label: "🔬 Khám phụ khoa" },
  ],
  "Đi lại": [
    { value: "Xăng dầu", label: "⛽ Xăng dầu" },
    { value: "Bảo dưỡng xe", label: "🔧 Bảo dưỡng xe" },
    { value: "Vé xe buýt", label: "🚌 Vé xe buýt" },
    { value: "Vé tàu", label: "🚆 Vé tàu" },
    { value: "Vé máy bay", label: "✈️ Vé máy bay" },
    { value: "Taxi", label: "🚖 Taxi" },
    { value: "Dịch vụ gọi xe", label: "🚗 Dịch vụ gọi xe" },
    { value: "Bảo hiểm xe", label: "🛡️ Bảo hiểm xe" },
    { value: "Phí cầu đường", label: "🛣️ Phí cầu đường" },
    { value: "Phí đỗ xe", label: "🅿️ Phí đỗ xe" },
  ],
  "Nhà cửa": [
    { value: "Tiền thuê nhà", label: "🏠 Tiền thuê nhà" },
    { value: "Điện", label: "💡 Điện" },
    { value: "Nước", label: "💧 Nước" },
    { value: "Internet", label: "🌐 Internet" },
    { value: "Truyền hình cáp", label: "📺 Truyền hình cáp" },
    { value: "Dịch vụ vệ sinh", label: "🧹 Dịch vụ vệ sinh" },
    { value: "Sửa chữa nhà", label: "🔧 Sửa chữa nhà" },
    { value: "Thuê người giúp việc", label: "🧑‍🔧 Thuê người giúp việc" },
    { value: "Nội thất", label: "🛋️ Nội thất" },
    { value: "Trang trí nhà cửa", label: "🖼️ Trang trí nhà cửa" },
  ],
  "Học tập": [
    { value: "Học phí", label: "💸 Học phí" },
    { value: "Sách giáo khoa", label: "📚 Sách giáo khoa" },
    { value: "Dụng cụ học tập", label: "🖋️ Dụng cụ học tập" },
    { value: "Khóa học online", label: "💻 Khóa học online" },
    { value: "Gia sư", label: "👨‍🏫 Gia sư" },
    { value: "Học thêm", label: "📖 Học thêm" },
    { value: "Tiền dự thi", label: "📝 Tiền dự thi" },
    { value: "Sự kiện học tập", label: "🎓 Sự kiện học tập" },
    { value: "Đồng phục", label: "👔 Đồng phục" },
    { value: "Thiết bị học tập", label: "🖥️ Thiết bị học tập" },
  ],
  "Hóa đơn": [
    { value: "Điện", label: "💡 Điện" },
    { value: "Nước", label: "💧 Nước" },
    { value: "Internet", label: "🌐 Internet" },
    { value: "Truyền hình cáp", label: "📺 Truyền hình cáp" },
    { value: "Điện thoại", label: "📱 Điện thoại" },
    { value: "Thuế", label: "💸 Thuế" },
    { value: "Phí dịch vụ", label: "🔧 Phí dịch vụ" },
    { value: "Phí bảo trì", label: "🛠️ Phí bảo trì" },
    { value: "Tiền vay", label: "💳 Tiền vay" },
    { value: "Tiền lãi", label: "💰 Tiền lãi" },
  ],
  "Học bổng": [
    { value: "Học bổng toàn phần", label: "🎓 Học bổng toàn phần" },
    { value: "Học bổng bán phần", label: "🎓 Học bổng bán phần" },
    { value: "Học bổng tài năng", label: "🎓 Học bổng tài năng" },
    { value: "Học bổng nghiên cứu", label: "🎓 Học bổng nghiên cứu" },
    { value: "Học bổng hỗ trợ", label: "🎓 Học bổng hỗ trợ" },
  ],
  "Tiền lương": [
    { value: "Lương căn bản", label: "💵 Lương căn bản" },
    { value: "Lương ngoài giờ", label: "💵 Lương ngoài giờ" },
    { value: "Lương tháng 13", label: "💵 Lương tháng 13" },
    { value: "Lương hợp đồng", label: "💵 Lương hợp đồng" },
    { value: "Lương thưởng", label: "💵 Lương thưởng" },
  ],
  "Tiền thưởng": [
    { value: "Thưởng dự án", label: "💵 Thưởng dự án" },
    { value: "Thưởng hiệu suất", label: "💵 Thưởng hiệu suất" },
    { value: "Thưởng doanh thu", label: "💵 Thưởng doanh thu" },
    { value: "Thưởng tết", label: "💵 Thưởng tết" },
    { value: "Thưởng thành tích", label: "💵 Thưởng thành tích" },
  ],
  "Quà tặng": [
    { value: "Quà sinh nhật", label: "🎁 Quà sinh nhật" },
    { value: "Quà lễ", label: "🎁 Quà lễ" },
    { value: "Quà kỷ niệm", label: "🎁 Quà kỷ niệm" },
    { value: "Quà cưới", label: "🎁 Quà cưới" },
    { value: "Quà từ thiện", label: "🎁 Quà từ thiện" },
  ],
  "Nhận tiền": [
    { value: "Nhận tiền mặt", label: "💸 Nhận tiền mặt" },
    { value: "Chuyển khoản", label: "💸 Chuyển khoản" },
    { value: "Tiền thừa kế", label: "💸 Tiền thừa kế" },
    { value: "Tiền bồi thường", label: "💸 Tiền bồi thường" },
    { value: "Tiền đền bù", label: "💸 Tiền đền bù" },
  ],
  "Lợi nhuận đầu tư": [
    { value: "Lợi nhuận cổ phiếu", label: "📈 Lợi nhuận cổ phiếu" },
    { value: "Lợi nhuận trái phiếu", label: "📈 Lợi nhuận trái phiếu" },
    { value: "Lợi nhuận bất động sản", label: "📈 Lợi nhuận bất động sản" },
    { value: "Lợi nhuận từ vàng", label: "📈 Lợi nhuận từ vàng" },
    {
      value: "Lợi nhuận từ tiền điện tử",
      label: "📈 Lợi nhuận từ tiền điện tử",
    },
  ],
  "Thu nhập từ kinh doanh": [
    { value: "Lợi nhuận bán hàng", label: "🏪 Lợi nhuận bán hàng" },
    { value: "Lợi nhuận dịch vụ", label: "🏪 Lợi nhuận dịch vụ" },
    { value: "Thu nhập từ hợp đồng", label: "🏪 Thu nhập từ hợp đồng" },
    { value: "Thu nhập từ quảng cáo", label: "🏪 Thu nhập từ quảng cáo" },
    { value: "Thu nhập từ liên kết", label: "🏪 Thu nhập từ liên kết" },
  ],
  "Tiền tiết kiệm": [
    { value: "Lãi suất ngân hàng", label: "💰 Lãi suất ngân hàng" },
    { value: "Lãi suất trái phiếu", label: "💰 Lãi suất trái phiếu" },
    {
      value: "Lãi suất chứng chỉ tiền gửi",
      label: "💰 Lãi suất chứng chỉ tiền gửi",
    },
    { value: "Lãi suất quỹ tương hỗ", label: "💰 Lãi suất quỹ tương hỗ" },
    {
      value: "Lãi suất tiết kiệm trực tuyến",
      label: "💰 Lãi suất tiết kiệm trực tuyến",
    },
  ],
  "Bảo hiểm": [
    { value: "Bảo hiểm y tế", label: "🛡️ Bảo hiểm y tế" },
    { value: "Bảo hiểm nhân thọ", label: "🛡️ Bảo hiểm nhân thọ" },
    { value: "Bảo hiểm xe", label: "🛡️ Bảo hiểm xe" },
    { value: "Bảo hiểm nhà", label: "🛡️ Bảo hiểm nhà" },
    { value: "Bảo hiểm du lịch", label: "🛡️ Bảo hiểm du lịch" },
  ],
  "Tiền lãi": [
    { value: "Lãi suất ngân hàng", label: "💵 Lãi suất ngân hàng" },
    { value: "Lãi suất trái phiếu", label: "💵 Lãi suất trái phiếu" },
    { value: "Lãi suất cho vay", label: "💵 Lãi suất cho vay" },
    { value: "Lãi suất đầu tư", label: "💵 Lãi suất đầu tư" },
    { value: "Lãi suất tiết kiệm", label: "💵 Lãi suất tiết kiệm" },
  ],
  "Hỗ trợ từ gia đình": [
    { value: "Tiền bố mẹ cho", label: "👪 Tiền bố mẹ cho" },
    { value: "Tiền người thân cho", label: "👪 Tiền người thân cho" },
    { value: "Tiền trợ cấp", label: "👪 Tiền trợ cấp" },
    { value: "Tiền cho vay không lãi", label: "👪 Tiền cho vay không lãi" },
    { value: "Tiền bảo trợ", label: "👪 Tiền bảo trợ" },
  ],
  "Công việc tự do": [
    { value: "Thu nhập từ viết lách", label: "🧑‍💻 Thu nhập từ viết lách" },
    { value: "Thu nhập từ thiết kế", label: "🧑‍💻 Thu nhập từ thiết kế" },
    { value: "Thu nhập từ lập trình", label: "🧑‍💻 Thu nhập từ lập trình" },
    { value: "Thu nhập từ dịch vụ", label: "🧑‍💻 Thu nhập từ dịch vụ" },
    { value: "Thu nhập từ tư vấn", label: "🧑‍💻 Thu nhập từ tư vấn" },
  ],
  "Thu nhập thụ động": [
    { value: "Thu nhập từ bản quyền", label: "🏖️ Thu nhập từ bản quyền" },
    { value: "Thu nhập từ tiền thuê", label: "🏖️ Thu nhập từ tiền thuê" },
    { value: "Thu nhập từ liên kết", label: "🏖️ Thu nhập từ liên kết" },
    {
      value: "Thu nhập từ lợi nhuận đầu tư",
      label: "🏖️ Thu nhập từ lợi nhuận đầu tư",
    },
    { value: "Thu nhập từ cổ tức", label: "🏖️ Thu nhập từ cổ tức" },
  ],
  "Tiền hoa hồng": [
    { value: "Hoa hồng bán hàng", label: "💹 Hoa hồng bán hàng" },
    { value: "Hoa hồng dịch vụ", label: "💹 Hoa hồng dịch vụ" },
    { value: "Hoa hồng quảng cáo", label: "💹 Hoa hồng quảng cáo" },
    { value: "Hoa hồng tư vấn", label: "💹 Hoa hồng tư vấn" },
    { value: "Hoa hồng liên kết", label: "💹 Hoa hồng liên kết" },
  ],
};

// Category options
const categoryExpenseOptions = [
  { value: "Ăn uống", label: "🍽️ Ăn uống" },
  { value: "Làm đẹp", label: "💅 Làm đẹp" },
  { value: "Giải trí", label: "🎬 Giải trí" },
  { value: "Mua sắm", label: "🛒 Mua sắm" },
  { value: "Sức khỏe", label: "❤️ Sức khỏe" },
  { value: "Đi lại", label: "🚗 Đi lại" },
  { value: "Nhà cửa", label: "🏠 Nhà cửa" },
  { value: "Học tập", label: "📚 Học tập" },
  { value: "Hóa đơn", label: "📑 Hóa đơn" },
];

// Define options for income
const categoryIncomeOptions = [
  { value: "Học bổng", label: "🎓 Học bổng" },
  { value: "Tiền lương", label: "💵 Tiền lương" },
  { value: "Tiền thưởng", label: "💵 Tiền thưởng" },
  { value: "Quà tặng", label: "🎁 Quà tặng" },
  { value: "Nhận tiền", label: "💸 Nhận tiền" },
  { value: "Lợi nhuận đầu tư", label: "📈 Lợi nhuận đầu tư" },
  { value: "Thu nhập từ kinh doanh", label: "🏪 Thu nhập từ kinh doanh" },
  { value: "Tiền tiết kiệm", label: "💰 Tiền tiết kiệm" },
  { value: "Bảo hiểm", label: "🛡️ Bảo hiểm" },
  { value: "Tiền lãi", label: "💵 Tiền lãi" },
  { value: "Hỗ trợ từ gia đình", label: "👪 Hỗ trợ từ gia đình" },
  { value: "Công việc tự do", label: "🧑‍💻 Công việc tự do" },
  { value: "Thu nhập thụ động", label: "🏖️ Thu nhập thụ động" },
  { value: "Tiền hoa hồng", label: "💹 Tiền hoa hồng" },
];

// Define grouped options
const groupedOptions = [
  {
    label: "Chi",
    options: categoryExpenseOptions,
  },
  {
    label: "Thu",
    options: categoryIncomeOptions,
  },
];

const CategoryModal = ({ isOpen, onClose, transaction, onApply }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      setOptions(initialOptions[selectedCategory.value] || []);
    }
  }, [selectedCategory]);

  const handleSubCategoryChange = (selectedOptions) => {
    setSelectedSubCategories(selectedOptions || []);
  };

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setOptions((prevOptions) => [...prevOptions, newOption]);
    setSelectedSubCategories((prev) => [...prev, newOption]);
  };

  useEffect(() => {
    if (!isOpen) {
      resetFields();
    }
  }, [isOpen]);

  const resetFields = () => {
    setSelectedCategory(null);
    setSelectedSubCategories([]);
  };

  const handleApply = () => {
    if (selectedCategory) {
      onApply({
        transactionId: transaction.id,
        userCategory: selectedCategory ? selectedCategory.value : "",
        userSubCategory: selectedSubCategories
          .map((sub) => sub.value)
          .join(","),
      });
      onClose();
    } else {
      toast.error("Vui lòng chọn danh mục trước khi áp dụng");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center font-be-vietnam-pro z-50">
      <div className="bg-white p-5 rounded-lg lg:w-[45%] md:w-2/3 sm:w-1/2 max-sm:w-4/5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl">Phân loại giao dịch</h2>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedSubCategories([]);
              onClose();
            }}
          >
            <FaTimes className="w-5 h-5 text-black" />
          </button>
        </div>
        <div className="flex flex-row justify-around items-start">
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Tự động</h3>
            <div className="mt-2">
              <div className="flex flex-row mb-2">
                <p className="font-semibold mr-1">Danh mục:</p>
                <p>{transaction.category || "Chưa phân loại"}</p>
              </div>
              <p className="font-semibold">Phân loại phụ:</p>
              {transaction.subCategory ? (
                <ul className="list-disc ml-10">
                  {transaction.subCategory.split(",").map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
                </ul>
              ) : (
                <p>Không có</p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Thủ công</h3>
            <div className="mt-2">
              <div className="flex flex-row mb-2">
                <p className="font-semibold mr-1">Danh mục:</p>
                <p>{transaction.userCategory || "Chưa phân loại"}</p>
              </div>
              <p className="font-semibold">Phân loại phụ:</p>
              {transaction.userSubCategory ? (
                <ul className="list-disc ml-10">
                  {transaction.userSubCategory.split(",").map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
                </ul>
              ) : (
                <p className="ml-5">Không có</p>
              )}
            </div>
          </div>
        </div>
        <hr className="mt-4" />
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Chỉnh sửa</h3>
          <div className="mt-2">
            <label className="block text-sm">Danh mục</label>
            <Select
              className="w-full mt-2"
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={groupedOptions}
              isClearable
              placeholder="Chọn danh mục..."
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm">Phân loại phụ</label>
            <CreatableSelect
              isMulti
              value={selectedSubCategories}
              onChange={handleSubCategoryChange}
              onCreateOption={handleCreate}
              options={options}
              isClearable
              placeholder="Chọn hoặc tạo phân loại phụ..."
              className="mt-2"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={resetFields}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Đặt lại
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Hủy
          </button>
          <button
            onClick={handleApply}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
