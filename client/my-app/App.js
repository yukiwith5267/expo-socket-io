import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native'; // TextとAlertをインポート
import io from 'socket.io-client';

const socket = io('https://8beb-114-48-56-200.ngrok-free.app'); // サーバーのアドレスに合わせてください

function App() {
    useEffect(() => {
        socket.on('notification', (message) => {
            Alert.alert("Notification", message); // React NativeのAlertを使用
        });

        return () => {
            socket.off('notification');
        };
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24 }}>React Socket.IO Example</Text>
        </View>
    );
}

export default App;
