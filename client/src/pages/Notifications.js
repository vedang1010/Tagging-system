import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import styles from '../styles/Notifications.module.css';
//import notificationSound from '../assets/notification.mp3'; 
const socket = socketIOClient('http://localhost:5000', {
  transports: ['websocket'],
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const NotificationsPage = () => {
  sessionStorage.setItem("location","/notifications")

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
  
      socket.on('statusUpdate', (notification) => {
        
        setNotifications((prevNotifications) => [notification, ...prevNotifications]);
      });

      socket.on('modifyComponent', (notification) => {
        
        setNotifications((prevNotifications) => [notification, ...prevNotifications]);
      });

    
  
      return () => {
        socket.disconnect();
      };
    }, []);

    
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.notificationscontainer}>
      <h2 className={styles.notificationstitle}>Notifications <span role="img" aria-label="bell">🔔</span></h2>
      <div className={styles.notificationslist}>
        {notifications.slice(0).reverse().map(notification => (
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