import React, { useEffect, useState } from 'react';
import { getSystemNotification } from '../../services/notiService';
import NotificationCard from './NotificationCard';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getSystemNotification();
        // Assuming createdTime is a string, we convert it to a Date object for comparison
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNotifications(sortedData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  if (!notifications.length) {
    return <div className='flex flex-1 justify-center items-center text-white text-center text-2xl font-be-vietnam-pro'>Hiện không có thông báo nào.</div>;
  }

  return (
    <div className="flex flex-col flex-1 space-y-4 overflow-y-auto">
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default Notification;
