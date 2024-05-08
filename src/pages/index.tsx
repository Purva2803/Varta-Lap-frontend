// pages/index.tsx

import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const Home = () => {
  const [name, setName] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log("Attempting to establish socket connection...");
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    return () => {
      console.log("Closing socket connection...");
      newSocket.close();
    }
  }, []);

  const handleJoinRoom = () => {
    if (socket && name) {
      console.log("Joining room with name:", name);
      socket.emit('join', name);
      setIsConnected(true);
    }
  };

  const handleLeaveRoom = () => {
    if (socket) {
      console.log("Leaving room...");
      socket.emit('leave');
      setIsConnected(false);
    }
  };

  console.log("Rendering Home component...");
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Real-Time Communication App</h1>
      {!isConnected ? (
        <form onSubmit={handleJoinRoom}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
          <button type="submit">Join Room</button>
        </form>
      ) : (
        <div>
          <p>Welcome {name} to the room</p>
          <button onClick={handleLeaveRoom}>Leave Room</button>
        </div>
      )}
    </div>
  );
};

export default Home;
