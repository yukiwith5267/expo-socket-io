const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

server.listen(8000, () => {
    console.log('Listening on port 8000');
});

// 10秒ごとにクライアントに通知
setInterval(() => {
    // 通知のメッセージを変更可能です。ここでは例として固定のメッセージを使用しています。
    io.emit('notification', 'Regular 10-second notification'); // クライアント全員に通知
}, 10000); // 10000ミリ秒（10秒）ごとにチェック

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
