import { useState, useRef } from "react";

const useNotification = () => {
  const [notification, setNotification] = useState(null);
  const notificationSound = useRef(new Audio("/notification/notification.mp3"));

  // 🔓 Unlock sound ek bar user login ke baad
  const prepareSound = () => {
    notificationSound.current.play().then(() => {
      notificationSound.current.pause();
      notificationSound.current.currentTime = 0;
      console.log("🔓 Notification sound unlocked!");
    }).catch(err => console.warn("Sound unlock failed:", err));
  };

  const notify = (message, duration = 3000) => {
    setNotification(message);

    notificationSound.current.currentTime = 0;
    notificationSound.current.play().catch(err => {
      console.warn("Notification sound blocked:", err);
    });

    if (duration) {
      setTimeout(() => setNotification(null), duration);
    }
  };

  const clearNotification = () => {
    setNotification(null);
  };

  return {
    notification,
    notify,
    clearNotification,
    prepareSound, // expose kiya
  };
};

export default useNotification;
