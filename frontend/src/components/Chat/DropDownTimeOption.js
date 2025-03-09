import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";
import { ContextApp } from "../../utils/Context";
import { GiStarSwirl } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { GiFallingStar } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import {
  format,
  subDays,
  startOfWeek,
  startOfMonth,
  subWeeks,
  subMonths,
} from "date-fns";

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
  right: 10px;
  background-color: #fff;
  min-width: 200px;
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

const DropdownTime = () => {
  const { selectedTime, setSelectedTime, setFromDate, setToDate } =
    useContext(ContextApp);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const todayDate = new Date();
  console.log(todayDate);
  const handleSelect = (time) => {
    setSelectedTime(time);
    setIsOpen(false); // Close the dropdown

    const today = new Date();
    let fromDate, toDate;
    toDate = format(today, "yyyy-MM-dd");

    switch (time) {
      case "Từ Hôm nay":
        fromDate = toDate = format(today, "yyyy-MM-dd");
        break;
      case "Từ Hôm qua":
        fromDate = format(subDays(today, 1), "yyyy-MM-dd");
        // toDate = format(today, "yyyy-MM-dd");
        break;
      case "Từ Tuần này":
        fromDate = format(
          startOfWeek(today, { weekStartsOn: 1 }),
          "yyyy-MM-dd"
        );
        // toDate = format(today, "yyyy-MM-dd");
        break;
      case "Từ Tuần trước":
        fromDate = format(
          startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 }),
          "yyyy-MM-dd"
        );
        // toDate = format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");
        break;
      case "Từ Tháng này":
        fromDate = format(startOfMonth(today), "yyyy-MM-dd");
        // toDate = format(today, "yyyy-MM-dd");
        break;
      case "Từ Tháng trước":
        fromDate = format(startOfMonth(subMonths(today, 1)), "yyyy-MM-dd");
        // toDate = format(startOfMonth(today), "yyyy-MM-dd");
        break;
      default:
        fromDate = toDate = format(today, "yyyy-MM-dd");
    }
    console.log(fromDate, toDate);

    setFromDate(fromDate);
    setToDate(toDate);
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

  const range = [
    "Từ Hôm nay",
    "Từ Hôm qua",
    "Từ Tuần này",
    "Từ Tuần trước",
    "Từ Tháng này",
    "Từ Tháng trước",
  ];

  return (
    <DropdownWrapper ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        {selectedTime} <FaChevronDown />
      </DropdownButton>
      <DropdownContent isOpen={isOpen}>
        {range &&
          range.length > 0 &&
          range.map((item, index) => {
            return (
              <DropdownItem onClick={() => handleSelect(item)}>
                <div className="flex flex-col pr-2">
                  <span className="text-sm">{item}</span>
                </div>
                {selectedTime == item ? <FaCheckCircle /> : <FaRegCircle />}
              </DropdownItem>
            );
          })}
        {/* <DropdownItem onClick={() => handleSelect("Từ Hôm nay")}>
          <div className="flex flex-col pr-2">
            <span className="text-sm">Từ Hôm nay</span>
          </div>
          {selectedTime == "Từ Hôm nay" ? <FaCheckCircle /> : <FaRegCircle />}
        </DropdownItem>
        <DropdownItem onClick={() => handleSelect("BankGPT")}>
          <div className="flex flex-col pr-2">
            <span className="text-sm">Từ Hôm qua</span>
          </div>
          {selectedModel == "BankGPT" ? <FaCheckCircle /> : <FaRegCircle />}
        </DropdownItem>
        <DropdownItem onClick={() => handleSelect("BankGPT")}>
          <div className="flex flex-col pr-2">
            <span className="text-sm">Từ Tuần này</span>
          </div>
          {selectedModel == "BankGPT" ? <FaCheckCircle /> : <FaRegCircle />}
        </DropdownItem>
        <DropdownItem onClick={() => handleSelect("BankGPT")}>
          <div className="flex flex-col pr-2">
            <span className="text-sm">Từ Tuần trước</span>
          </div>
          {selectedModel == "BankGPT" ? <FaCheckCircle /> : <FaRegCircle />}
        </DropdownItem>
        <DropdownItem onClick={() => handleSelect("BankGPT")}>
          <div className="flex flex-col pr-2">
            <span className="text-sm">Từ Tháng này</span>
          </div>
          {selectedModel == "BankGPT" ? <FaCheckCircle /> : <FaRegCircle />}
        </DropdownItem>
        <DropdownItem onClick={() => handleSelect("BankGPT")}>
          <div className="flex flex-col pr-2">
            <span className="text-sm">Từ Tháng trước</span>
          </div>
          {selectedModel == "BankGPT" ? <FaCheckCircle /> : <FaRegCircle />}
        </DropdownItem> */}
      </DropdownContent>
    </DropdownWrapper>
  );
};

export default DropdownTime;
