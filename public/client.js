var socket = io('http://localhost:8000');
socket.on('connect', function (data) { 
    socket.emit('join', 'Hello server from client');
});

// listen thread event
socket.on('thread', function (data) { 
    $('#thread').append(`<li>${data}</li>`);
});

// sự kiện submit form release một sự kiện message
$('#chat-form').submit((event) => {
    var message = $('#message').val();
    socket.emit('message', message);
    // return false để tránh load form
    return false;
})