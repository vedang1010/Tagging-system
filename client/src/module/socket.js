import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://localhost:5000', {
  
    cors: {
      origin: "*",
     
    }
  });

export default socket;