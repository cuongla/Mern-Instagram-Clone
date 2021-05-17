require('dotenv').config();
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from "http";
import { Server } from "socket.io";
import path from 'path';
import SocketServer from './socketServer';
import { ExpressPeerServer } from 'peer';

// routes
import AuthRoutes from './routes/auth.routes';
import UserRoutes from './routes/user.routes';
import PostRoutes from './routes/post.routes';
import CommentRoutes from './routes/comment.routes';
import NotificationRoutes from './routes/notification.routes';

// app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// socket
const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket: any) => SocketServer(socket));

// express peer server
ExpressPeerServer(http, { path: '/' });

// routes
app.use('/api', AuthRoutes);
app.use('/api', UserRoutes);
app.use('/api', PostRoutes);
app.use('/api', CommentRoutes);
app.use('/api', NotificationRoutes);

// connect to db
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log(`Connecting to mongodb`)
});

//production for deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

// connecting to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listning to port ${port}`));