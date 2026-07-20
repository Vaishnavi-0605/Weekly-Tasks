const text = document.querySelector('#chat-form');
const chatmsg = document.querySelector('.chat-messages');
const roomName = document.querySelector('#room-name');
const userList = document.querySelector('#users')

const socket = io();

const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix : true
});

console.log(username, room);

socket.emit('joinRoom', {username, room});


//Get room users
socket.on('roomUsers', ({room, users})=>{
    outputRoomName(room);
    outputUsers(users);
})

//Message from server
socket.on('message', message =>{
    console.log(message);
    outputMessage(message);

    //Scroll down
    chatmsg.scrollTop=chatmsg.scrollHeight;
});

//Message submit
text.addEventListener('submit', (e)=>{
    e.preventDefault();

    //get msg from the inpt
    const msg = e.target.elements.msg.value;

    //emit msg to server
    socket.emit('chat', msg);

    //Clear input
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
});

//Output message to dom
function outputMessage(message){
    const div = document.createElement('div');

    div.classList.add('message');
    div.innerHTML = `<p class="meta">
                ${message.username}<span>  ${message.time}</span>
            </p>

            <p class="text">
                ${message.text}
            </p>`;

            document.querySelector('.chat-messages').appendChild(div);
}

//Add Room name to DOM
function outputRoomName(room){
    roomName.innerHTML = room;
}

//Add Users to DOM
function outputUsers(users){
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}