import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

const SOCKET_URL = 'https://backend-crm-test.el-shayeb.cloud';

export function getSocket(token: string): Socket {
  // If socket connection exists but the token changed, update auth and reconnect
  // without destroying the instance. This preserves active query listeners.
  if (socket) {
    const currentAuth = socket.auth as { token?: string };
    if (currentAuth?.token !== token) {
      console.log('Socket token changed. Updating token and reconnecting...');
      socket.auth = { token };
      socket.disconnect().connect();
    }
    return socket;
  }

  socket = io(SOCKET_URL, {
    auth: { token },
    query: { 'ngrok-skip-browser-warning': 'true' },
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 10000,
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket?.id);
  });

  socket.on('disconnect', (reason) => {
    console.warn('Socket disconnected:', reason);
  });

  socket.on('connect_error', (err) => {
    console.error('Socket connection error:', err.message);
  });

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
