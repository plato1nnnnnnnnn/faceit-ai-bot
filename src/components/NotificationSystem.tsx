import React, { useState, useEffect } from 'react';

// Стили для компонента уведомлений
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    background: '#f9f9f9',
    margin: '10px 0',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

/**
 * Компонент для отображения системы уведомлений.
 * @returns JSX.Element
 */
const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Имитация получения уведомлений с API
    const fetchNotifications = () => {
      setTimeout(() => {
        setNotifications([
          { id: 1, message: 'New teammate added!' },
          { id: 2, message: 'Subscription updated successfully.' },
          { id: 3, message: 'Your analysis results are ready.' },
        ]);
      }, 1000);
    };

    fetchNotifications();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Notifications</h2>
      <ul style={styles.list}>
        {notifications.map((notification) => (
          <li key={notification.id} style={styles.listItem}>
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationSystem;