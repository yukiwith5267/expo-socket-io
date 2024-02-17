const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// サーバーがポート3000でリッスン
server.listen(3000, () => {
    console.log('Listening on port 3000');
});

// 毎分チェックして、7時50分になったらクライアントに通知
setInterval(() => {
    const date = new Date();
    if (date.getHours() === 7 && date.getMinutes() === 50) {
        io.emit('notification', 'It\'s 7:50 AM!'); // クライアント全員に通知
    }
}, 60000); // 60000ミリ秒（1分）ごとにチェック

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
