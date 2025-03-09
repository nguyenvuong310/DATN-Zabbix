import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";
import { ContextApp } from "../../utils/Context";
import { GiStarSwirl } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { GiFallingStar } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #162636;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #263646;
  }
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  background-color: #fff;
  min-width: 300px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 10px;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const DropdownChat = () => {
  const { setSelectedModel, selectedModel } = useContext(ContextApp);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (model) => {
    setSelectedModel(model);
    setIsOpen(false); // Close the dropdown
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownWrapper ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        {selectedModel} <FaChevronDown />
      </DropdownButton>
      <DropdownContent isOpen={isOpen}>
        <DropdownItem onClick={() => handleSelect("BankGPT")}>
          <div className="flex flex-row gap-2 items-center">
            <GiFallingStar />
            <div className="flex flex-col pr-2">
              <span className="text-sm">BankGPT</span>
              <span className="text-xs text-gray-500">
                Đáp ứng mọi câu hỏi liên quan đến tài chính và các lĩnh vực khác
              </span>
            </div>
          </div>
          {selectedModel == "BankGPT" ? <FaCheckCircle /> : <FaRegCircle />}
        </DropdownItem>
        <DropdownItem onClick={() => handleSelect("BankGPT Plus 3.5")}>
          <div className="flex flex-row gap-2 items-center">
            <BsStars />
            <div className="flex flex-col pr-2">
              <span className="text-sm">BankGPT Plus 3.5</span>
              <span className="text-xs text-gray-500">
                Phù hợp cho việc truy vấn số liệu và nhận thông tin chính xác
              </span>
            </div>
          </div>
          {selectedModel == "BankGPT Plus 3.5" ? (
            <FaCheckCircle />
          ) : (
            <FaRegCircle />
          )}
        </DropdownItem>
        <DropdownItem onClick={() => handleSelect("BankGPT Premium 4.0")}>
          <div className="flex flex-row gap-2 items-center">
            <GiStarSwirl />

            <div className="flex flex-col pr-2">
              <span className="text-sm">BankGPT Premium 4.0</span>
              <span className="text-xs text-gray-500">
                Phù hợp cho việc tạo biểu đồ và phân tích thống kê chi tiết
              </span>
            </div>
          </div>
          {selectedModel == "BankGPT Premium 4.0" ? (
            <FaCheckCircle />
          ) : (
            <FaRegCircle />
          )}
        </DropdownItem>
      </DropdownContent>
    </DropdownWrapper>
  );
};

export default DropdownChat;
