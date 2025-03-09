import React, { useState, useRef, useEffect } from 'react';
import AnimatedPage from '../../AnimatedPage';

const NotificationCard = ({ notification }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded]);

  return (
    <>
    <div className="bg-gray-800 text-white rounded-xl p-4 cursor-pointer font-be-vietnam-pro space-y-2" onClick={toggleExpand}>
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-400">{formatDate(notification.createdAt)}</p>
          <p className={`text-xl font-bold ${isExpanded ? '' : 'truncate'}`}>
            {notification.title}
          </p>
        </div>
      </div>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[200px]' : 'max-h-0'}`}
        style={{ maxHeight: isExpanded ? `${contentHeight}px` : '0' }}
      >
        <div className="space-y-2">
          <p className='text-md'>{notification.message}</p>
          <p>Cập nhật vào lúc: <span className="font-semibold">{formatDate(notification.updatedAt)}</span></p>
        </div>
      </div>
    </div>
    </>
  );
};

export default NotificationCard;
