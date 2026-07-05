import React, { createContext, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { getCookie } from '../app/service/baseQuery';
import { getSocket, disconnectSocket } from './socket';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      disconnectSocket();
      setSocket(null);
      setIsConnected(false);
      return;
    }

    const s = getSocket(token);
    setSocket(s);
    setIsConnected(s.connected);

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    s.on('connect', onConnect);
    s.on('disconnect', onDisconnect);

    // Keep checking if token changed/cleared in a simple interval
    const interval = setInterval(() => {
      const currentToken = getCookie('token');
      if (!currentToken) {
        disconnectSocket();
        setSocket(null);
        setIsConnected(false);
      } else {
        const activeSocket = getSocket(currentToken);
        if (activeSocket !== s) {
          setSocket(activeSocket);
          setIsConnected(activeSocket.connected);
        }
      }
    }, 5000);

    return () => {
      clearInterval(interval);
      s.off('connect', onConnect);
      s.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
