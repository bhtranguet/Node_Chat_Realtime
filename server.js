var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Truy cập localhost thì sẽ trả về giao diện index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

// Nếu không có dòng này sẽ không thể lấy được file static
app.use('/public', express.static('public'));

// Lắng nghe sự kiện khi client connect và server
io.on('connection', client => {
    console.log('Client connected!');
    client.on('join', data => {
        console.log(data);
    });

    // Bắt sự kiện message ở client
    client.on('message', data => {
        // client của chính nó
        client.emit('thread', data);

        // các client khác connect tới server
        client.broadcast.emit('thread', data);
    });
});

// Run server
server.listen(8000, () => {
    console.log('server is running!');
})