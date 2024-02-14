import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import io from 'socket.io-client';

export default function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const socket = io('https://be76-114-48-56-200.ngrok-free.app');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('time', (data) => {
      setMessage(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{message}</Text>
    </View>
  );
}
