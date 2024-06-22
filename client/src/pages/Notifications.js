import React from 'react';
import styles from '../styles/Notifications.module.css';

const notifications = [
  { id: 1, name: 'John Doe', action: 'reacted to your post', time: '10 mins ago', message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.', image: 'path/to/image1.jpg' },
  { id: 2, name: 'Richard Miles', action: 'liked your post', time: '10 mins ago', message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.', image: 'path/to/image2.jpg' },
  { id: 3, name: 'Brian Cumin', action: 'reacted to your post', time: '10 mins ago', message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.', image: 'path/to/image3.jpg' },
  { id: 4, name: 'Lance Bogrol', action: 'reacted to your post', time: '10 mins ago', message: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.', image: 'path/to/image4.jpg' },
];

const Notifications = () => {
  return (
    <div className={styles.notificationscontainer}>
      <h2 className={styles.notificationstitle}>Notifications <span role="img" aria-label="bell">🔔</span></h2>
      <div className={styles.notificationslist}>
        {notifications.map(notification => (
          <div key={notification.id} className={styles.notificationitem}>
            <img src={notification.image} alt={notification.name} className={styles.notificationimage} />
            <div className={styles.notificationdetails}>
              <p><strong>{notification.name}</strong> {notification.action}</p>
              <p>{notification.message}</p>
              <p className={styles.notificationtime}>{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
