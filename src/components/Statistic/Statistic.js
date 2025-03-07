// src/components/ImagesStore/ImagesStore.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getImageMessagesByUserId } from "../../services/chatService";
import ImageCard from "./ImageCard";
import AnimatedPage from "../../AnimatedPage";
import LoadingSpinner from "../Else/LoadingSpinner";
import { toast } from "react-toastify";

const Statistic = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const [imageMessages, setImageMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImageMessages = async () => {
      if (isAuthenticated && account && account.id) {
        setLoading(true);
        try {
          const messages = await getImageMessagesByUserId(account.id);
          const sortedData = messages.sort(
            (a, b) => new Date(b.time) - new Date(a.time)
          );
          setImageMessages(sortedData);
        } catch (error) {
          toast.error("Failed to fetch image messages.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchImageMessages();
  }, [isAuthenticated, account]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-1 justify-center items-center text-white text-2xl font-be-vietnam-pro">
        Hãy đăng nhập để xem các tin nhắn hình ảnh.
      </div>
    );
  }

  return (
    <AnimatedPage>
      {loading && <LoadingSpinner />}
      <div
        className={`flex flex-col flex-1 space-y-4 ${loading ? "blur-sm" : ""}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(imageMessages) && imageMessages.length > 0 ? (
            imageMessages.map((message) => (
              <ImageCard key={message.id} imageMessage={message} />
            ))
          ) : (
            <div className="absolute flex justify-self-center place-self-center text-xl pt-10 text-white font-be-vietnam-pro">
              Không có tin nhắn biểu đồ nào để hiển thị.
            </div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Statistic;
