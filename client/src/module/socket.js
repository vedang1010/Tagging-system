import socketIOClient from 'socket.io-client';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const socket = socketIOClient(`${SERVER_URL}`, {
  
    cors: {
      origin: "*",
     
    }
  });

export default socket;