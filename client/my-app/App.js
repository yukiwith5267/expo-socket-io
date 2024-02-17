import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // サーバーのアドレスに合わせてください

function App() {
    useEffect(() => {
        socket.on('notification', (message) => {
            alert(message); // ブラウザのアラートで通知を表示
        });

        return () => {
            socket.off('notification');
        };
    }, []);

    return (
        <div className="App">
            <h1>React Socket.IO Example</h1>
        </div>
    );
}

export default App;
