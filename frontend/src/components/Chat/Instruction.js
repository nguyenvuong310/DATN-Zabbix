import React, { useContext } from "react";
import Logo from "../../assets/alterLogo.png";
import { ContextApp } from "../../utils/Context";
import { categoryQuestion } from "../../utils/sampleQuestions";
const Instruction = () => {
  const { suggestions, setSuggestions } = useContext(ContextApp);
  const cards = [
    { icon: "💰", title: "Quản lý tài chính cá nhân" },
    { icon: "💡", title: "Gợi ý chi tiêu và đầu tư" },
    { icon: "📈", title: "Cảnh báo thu chi bất thường" },
    { icon: "📉", title: "Tạo biểu đồ thống kê" },
  ];
  return (
    <>
      <div className=" w-full h-[85%] flex items-center justify-center overflow-auto overflow-y-auto px-2 py-1 scroll mb-10">
        <div className="w-full lg:w-4/5 flex flex-col h-full items-center justify-center">
          <img src={Logo} alt="" className="w-28 h-28" />
          <span className="text-white text-xl font-semibold text-center">
            BankGPT
          </span>
          <span className="text-white text-md font-semibold text-center mb-4">
            Trợ lý ảo tài chính cá nhân dành riêng cho bạn
          </span>
          <div className="flex flex-col items-center justify-center p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cards.map((card, index) => (
                <div
                  onClick={() => {
                    setSuggestions(categoryQuestion[card.title]);
                  }}
                  key={index}
                  className={`${
                    index > 1 ? "hidden lg:flex" : "flex"
                  } bg-slate-600 hover:bg-slate-400 cursor-pointer hover:text-white text-gray-400 p-6 rounded-lg shadow-md flex flex-col items-center text-center`}
                >
                  <div className="text-4xl text-center mb-4">{card.icon}</div>
                  <div className="text-md  font-semibold">{card.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Instruction;
