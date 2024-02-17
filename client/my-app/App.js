import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native'; // TextとAlertをインポート
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // サーバーのアドレスに合わせてください

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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> // スタイルを適用して中央に配置
            <Text style={{ fontSize: 24 }}>React Socket.IO Example</Text> // Textコンポーネントを使用
        </View>
    );
}

export default App;
