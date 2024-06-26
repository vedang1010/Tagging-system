import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socket from '../module/socket';
import styles from '../styles/Notifications.module.css';

const NotificationsPage = () => {
  sessionStorage.setItem("location", "/notifications");

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userEmail = localStorage.getItem('user');

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/notification/notifications');
      if (response.status === 200) {
        setNotifications(response.data);
      } else {
        setError('Failed to fetch notifications');
      }
    } catch (error) {
      setError("Error fetching notifications: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    socket.on("statusUpdate", (data) => {
      console.log(`${socket.id} statusUpdate:`, JSON.stringify(data, null, 2));
      setNotifications((prev) => [...prev, data]);
    });

    socket.on('modifyComponent', (data) => {
      console.log(`${socket.id} modifyComponent:`, JSON.stringify(data, null, 8));
      setNotifications((prev) => [...prev, data]);
    });

    
  }, [socket]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredNotifications = notifications.filter(notification => {
    return !notification.email || notification.email.includes(userEmail);
  });

  return (
    <div className={styles.notificationscontainer}>
      <h2 className={styles.notificationstitle}>Notifications <span role="img" aria-label="bell">🔔</span></h2>
      <div className={styles.notificationslist}>
        {filteredNotifications.slice(0).reverse().map(notification => (
          <div key={notification._id} className={styles.notificationitem}>
            <div className={styles.notificationdetails}>
              <p><strong>{notification.componentId}</strong> {notification.status}</p>
              <p>{notification.desc}</p>
              <p className={styles.notificationtime}>{new Date(notification.date).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
