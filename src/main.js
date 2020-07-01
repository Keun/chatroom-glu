import 'bootstrap-sass';
import './scss/style.scss';

const socket = io('/tech');
var url = window.location.href;
var roomArr = url.split('/');
var roomName = roomArr[roomArr.length-1];
var validRooms = ["chillout-place", "nightlife", "series-movies", "sports"];
var isCurrentRoom = validRooms.includes(roomName);

if (isCurrentRoom) {
    const room = roomName;
    $('form').submit(() => {
        let msg = $('#m').val();
        let user = localStorage.getItem('userName');

        socket.emit('message', { msg, room, user });
        $('#m').val('');
        return false;
    });

    socket.on('connect', () => {
        let user = localStorage.getItem('userName');
        //emitting to everybody
        socket.emit('join', { room: room, user:user });

        
    });

    socket.on('message', (data) => {
        let user = localStorage.getItem('userName');

        if(user == data.user){
            $('#messages').append($('<li class="mine">').text(data.msg+' - '+data.user));
        }else{
            $('#messages').append($('<li class="other">').text(data.msg+' - '+data.user));
        }

    });

  

    socket.on('singleMessage', (msg) => {
        $('#messages').append($('<li class="other">').text(msg));
    });

    socket.on('historyChats', (data) => {
        let user = localStorage.getItem('userName');

        for (var i = 0; i < data.length; i++) {
            if(user == data[i].user_name){
                $('#messages').append($('<li class="mine">').text(data[i].chat_text+' - '+data[i].user_name));
            }else{
                $('#messages').append($('<li class="other">').text(data[i].chat_text+' - '+data[i].user_name));
            }
        }

    });
}

$( document ).ready(function() {
    $('.room-name').text(roomName);
    var title = $('title').html();
    $('title').html(title.replace("{{room}}",roomName));

    $('body').on('click','._saveUserName', (event) => {
        event.preventDefault();
        var userName = $('._userName').val();

        socket.emit('registerUser', { user:userName });


        localStorage.setItem('userName',userName);

        //window.location.href = '/rooms'; 
    });

    socket.on('validUser', (value) => {
        console.log(value);
        if(value.valid === true){
            window.location.href = '/rooms'; 
        }else{
            //foutieve username
            //error tonen op het scherm
        }
    });
});