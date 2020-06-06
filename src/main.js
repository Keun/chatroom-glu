import 'bootstrap-sass';
import './scss/style.scss';

var url = window.location.href;
var roomArr = url.split('/');
var roomName = roomArr[roomArr.length-1];
var validRooms = ["chillout-place", "nightlife", "series-movies", "sports"];
var isCurrentRoom = validRooms.includes(roomName);

if (isCurrentRoom) {
    const room = roomName;
    const socket = io('/tech');
    $('form').submit(() => {
        let msg = $('#m').val();
        socket.emit('message', { msg, room });
        $('#m').val('');
        return false;
    });

    socket.on('connect', () => {
        //emitting to everybody
        socket.emit('join', { room: room });
    });

    socket.on('message', (msg) => {
        $('#messages').append($('<li>').text(msg));
    });
}