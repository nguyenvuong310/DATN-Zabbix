// src/components/ImagesStore/ImageCard.js
import React, { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import ChatPreview from "./ChatPreview";

const ImageCard = ({ imageMessage }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  console.log(imageMessage.recentMessages);

  const formatTime = (datetime) => {
    const date = new Date(datetime);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Function to extract text starting from "Biểu đồ"
  const extractFromBieuDo = (message) => {
    const startString = "biểu đồ";
    const startIndex = message.toLowerCase().indexOf(startString);

    if (startIndex !== -1) {
      return message.substring(startIndex);
    } else {
      return message; // Return the original message if "biểu đồ" is not found
    }
  };

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div
        className="transition-transform duration-300 p-4 flex-shrink-0 hover:scale-105 cursor-pointer"
        onClick={openModal}
      >
        <div className="bg-gray-800 text-white rounded-lg p-4">
          <div className="sm:max-h-56 max-sm:max-h-40 rounded-lg mb-4 flex items-center justify-center">
            <img
              src={imageMessage.message}
              alt="Image message"
              className="sm:h-52 max-sm:h-36 w-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-row justify-between mb-2 items-center">
            <p className="text-lg font-be-vietnam-pro">
              {formatDate(imageMessage.time)}
            </p>
            <p className="text-lg font-be-vietnam-pro">
              {formatTime(imageMessage.time)}
            </p>
          </div>

          <p className="text-sm capitalize truncate font-be-vietnam-pro">
            {extractFromBieuDo(
              imageMessage.recentMessages
                ?.filter(
                  (item) => item.type === "text" && item.role === "assistant"
                )
                ?.slice(-1)[0]?.message || "Biểu đồ"
            )}
          </p>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="flex max-sm:flex-col sm:flex-row max-h-[80%] max-sm:w-[90%] justify-center items-center z-50 bg-gray-900 p-4 rounded-lg w-full max-w-6xl overflow-auto "
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
      >
        <div className="relative max-sm:flex-col bg-gray-900 p-4 rounded-lg w-full max-w-6xl max-h-full overflow-auto flex flex-col md:flex-row">
          <div className="flex-1 flex justify-center items-center">
            <button
              onClick={closeModal}
              className="absolute max-sm:top-4 sm:top-4 right-4 max-sm:bg-gray-500  text-white text-3xl"
            >
              <FaTimes />
            </button>
            <PhotoProvider>
              <PhotoView src={imageMessage.message}>
                <img
                  src={imageMessage.message}
                  alt="Image message"
                  className="max-w-full max-h-full object-cover cursor-pointer rounded-lg"
                />
              </PhotoView>
            </PhotoProvider>
          </div>
          <div className="flex-1 max-h-full bg-gray-800 text-white p-4 rounded-lg mt-4 md:mt-0 md:ml-4">
            <p className="text-lg font-be-vietnam-pro">
              Giờ: {formatTime(imageMessage.time)}
            </p>
            <p className="text-lg font-be-vietnam-pro">
              Ngày: {formatDate(imageMessage.time)}
            </p>

            <div className="flex mt-4 flex-col overflow-hidden">
              <p className="text-lg font-be-vietnam-pro">
                {" "}
                Đoạn chat tương ứng:
              </p>
              {imageMessage && imageMessage.recentMessages && (
                <ChatPreview
                  message={imageMessage.recentMessages
                    .map((item) => {
                      return { ...item, text: item.message };
                    })
                    .filter((item) => item.type !== "code")}
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImageCard;
