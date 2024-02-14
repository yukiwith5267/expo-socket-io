const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const schedule = require('node-schedule');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// サーバー側での時刻チェックと通知
const job = schedule.scheduleJob('11 5 * * *', () => {
    const currentTime = new Date().toLocaleTimeString();
    io.emit('time', currentTime);
});

// Socket.ioの接続イベントを処理
io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
