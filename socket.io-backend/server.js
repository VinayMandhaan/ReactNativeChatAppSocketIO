const io = require('socket.io')();
const uuidv1 = require("uuid/v1");
const messageHandler = require('./handlers/messageHandler')
let currentUserId = 2;
const users={}

function createUserAvatarUrl(){
    const rand1 = Math.round(Math.random()*200+100)
    const rand2 = Math.round(Math.random()*200+100)
    return `https://placeimg.com/${rand1}/${rand2}/any`
}

// Get All Online Users
function createUsersOnline() {
    // Get All the Users in Values
    const values = Object.values(users);
    // Filter Users and Get Only Those User which have usernames
    const onlyWithUsernames = values.filter(u => u.username !== undefined);
    return onlyWithUsernames;
}

// When the App is started or Restarted, Io.on will create an connection and create a socket id 
io.on("connection",socket=>{
    console.log("User Connected")
    //When the app is started the socket will create a socket id for each user,
    //Assign Random Id to UserId of the particular user
    users[socket.id] = { userId: uuidv1() };
    // socket.on("join", username => {
    //     users[socket.id].username = username
    //     users[socket.id].avatar = createUserAvatarUrl()
    //     messageHandler.handleMessages(socket,users)
    // })

    // When the connection is disconnected, it will remove all the users and then emit all the online users again.
    socket.on("disconnect", () => {
        delete users[socket.id];
        io.emit("action", { type: "users_online", data: createUsersOnline() });
    });

    // What should a socket do on a particular action?
    socket.on("action",action=>{
        switch(action.type){
          // If the action type is Join, then the data will be sent from the UserInterface(Username), The username will be assigned to
          // the user joined and the avatar will be created
            case 'server/join':
                console.log("Join Event",action.data)
                users[socket.id].username = action.data
                users[socket.id].avatar = createUserAvatarUrl()
                // const values = Object.values(users)
                // const onlyWithUserName = values.filter(u => u.username!==undefined)
                // Io emit will broadcast all the users to everyone including the sender
                io.emit("action",{type:"users_online", data:createUsersOnline()})
                // While socket emit will only send the data of self user to the sender
                socket.emit("action",{type:"self_user",data:users[socket.id]})
                break;
            case 'server/private_message':
                // The convoId is the Id that the message is sent to
                const conversationId = action.data.conversationId;
                // From will be the sender
                const from = users[socket.id].userId;
                // We will save the Users and the socket id's and check if the conversationId sent exists, If it does then emit another action
                const userValues = Object.values(users);
                const socketIds = Object.keys(users); 
                for (let i = 0; i < userValues.length; i++) {
                  // Check if the conversationId sent by the User exist in the Online Users
                  if (userValues[i].userId === conversationId) {
                    // If it exists then get the particular socket id of that User
                    const socketId = socketIds[i];
                    // Emit another action to specific clients, the data will be the message sent and the conversationId will be now the sender
                    io.sockets.sockets[socketId].emit("action", {
                      type: "private_message",
                      data: {
                        ...action.data,
                        conversationId: from
                      }
                    });
                    break;
                  }
                }
                break;

        }
    })
})
io.listen(5000);