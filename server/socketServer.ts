import { INotification } from './interfaces/notification.interface';
import { IPost } from './interfaces/post.interface';
import { IUser } from './interfaces/user.interfaces';
import { IMessage } from './interfaces/message.interface';

let users = [];

const EditData = (data: any, id: string, call: any) => {
    console.log(data, id, call);
    const newData = data.map((item: any) =>
        item.id === id ? { ...item, call } : item
    )
    return newData;
}

// using socket.io to create a real-time update around the application
const SocketServer = (socket: any) => {
    // joining chat
    socket.on('joinUser', (user: IUser) => {
        users.push({
            id: user._id,
            socketId: socket.id,
            followers: user.followers
        })
    })

    // check if user is logged in
    // if not, disconnecting everything
    socket.on('disconnect', () => {
        const data = users.find(user => user.socketId === socket.id);

        if (data) {
            const clients = users.filter(user => data.followers.find((item: IUser) => item.id === user._id));

            if (clients.length > 0) {
                clients.forEach((client: IUser) => {
                    socket
                        .to(`${client.socketId}`)
                        .emit(`CheckUserOffline`, data.id)
                })
            }

            if (data.call) {
                const callUser = users.find(user => user.id === data.call)
                if (callUser) {
                    users = EditData(users, callUser.id, null)
                    socket
                        .to(`${callUser.socketId}`)
                        .emit('callerDisconnect')
                }
            }

            users = users.filter(user => user.SocketId !== socket.id);
        }
    })

    // like/unlike post for user
    socket.on('likePost', (newPost: IPost) => {
        const userPosts = newPost.user as IUser;
        const ids = [...userPosts.followers, userPosts._id];
        const clients = users.filter(user => ids.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('likeToClient', newPost)
            })
        }
    })

    socket.on('unLikePost', (newPost: IPost) => {
        const userPosts = newPost.user as IUser;
        const ids = [...userPosts.followers, userPosts._id];
        const clients = users.filter(user => ids.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {
                socket
                    .to(`${client.socketId}`)
                    .emit('unLikeToClient', newPost)
            })
        }
    })

    // create/delete comments
    socket.on('createComment', (newPost: IPost) => {
        const userPosts = newPost.user as IUser;
        const ids = [...userPosts.followers, userPosts._id];
        const clients = users.filter(user => ids.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {
                socket
                    .to(`${client.socketId}`)
                    .emit('createCommentToClient', newPost)
            })
        }
    })

    socket.on('deleteComment', (newPost: IPost) => {
        const userPosts = newPost.user as IUser;
        const ids = [...userPosts.followers, userPosts._id];
        const clients = users.filter(user => ids.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {
                socket
                    .to(`${client.socketId}`)
                    .emit('deleteCommentToClient', newPost)
            })
        }
    })

    // following/unfollowing
    socket.on('follow', (newUser: IUser) => {
        const user = users.find(user => user.id === newUser._id)
        user && socket
            .to(`${user.socketId}`)
            .emit('followToClient', newUser)
    })

    socket.on('unFollow', (newUser: IUser) => {
        const user = users.find(user => user.id === newUser._id)
        user && socket
            .to(`${user.socketId}`)
            .emit('unFollowToClient', newUser)
    })

    // add and remove notifications
    socket.on('createNotify', (msg: INotification) => {
        const client = users.find(user => msg.recipients.includes(user.id))
        client && socket
            .to(`${client.socketId}`)
            .emit('createNotifyToClient', msg)
    })

    socket.on('removeNotify', (msg: INotification) => {
        const client = users.find(user => msg.recipients.includes(user.id))
        client && socket
            .to(`${client.socketId}`)
            .emit('removeNotifyToClient', msg)

    })

    // creating a message 
    socket.on('addMessage', (msg: IMessage) => {
        const user = users.find(user => user.id === msg.recipient)
        user && socket
            .to(`${user.socketId}`)
            .emit('addMessageToClient', msg)
    });

    // Check user status
    socket.on('checkUserOnline', data => {
        const following = users.filter((user: IUser) =>
            data.following.find((item: IUser) => item._id === user.id)
        )
        socket.emit('checkUserOnlineToMe', following)

        const clients = users.filter((user: IUser) =>
            data.followers.find((item: IUser) => item._id === user.id)
        )

        if (clients.length > 0) {
            clients.forEach((client: IUser) => {
                socket
                    .to(`${client.socketId}`)
                    .emit('checkUserOnlineToClient', data._id)
            })
        }

    })


    // checking user is calling or not
    socket.on('callUser', (data: IMessage) => {
        users = EditData(users, data.sender as string, data.recipient)

        const client = users.find(user => user.id === data.recipient)

        if (client) {
            if (client.call) {
                socket.emit('userBusy', data)
                users = EditData(users, data.sender as string, null)
            } else {
                users = EditData(users, data.recipient as string, data.sender)
                socket.to(`${client.socketId}`).emit('callUserToClient', data)
            }
        }
    })

    socket.on('endCall', (data: IMessage) => {
        const client = users.find(user => user.id === data.sender)

        if (client) {
            socket.to(`${client.socketId}`).emit('endCallToClient', data)
            users = EditData(users, client.id, null)

            if (client.call) {
                const clientCall = users.find(user => user.id === client.call)
                clientCall && socket.to(`${clientCall.socketId}`).emit('endCallToClient', data)

                users = EditData(users, client.call, null)
            }
        }
    })
}




export default SocketServer;