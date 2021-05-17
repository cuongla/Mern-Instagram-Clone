require('dotenv').config();
import express, { request, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from "http";
import { Server } from "socket.io";
import path from 'path';
import SocketServer from './socketServer';
import { ExpressPeerServer } from 'peer';
import compression from 'compression';
import { dbStart } from './mongoose';
import morgan from 'morgan';
import Logger from './utils/logger';

// routes
import AuthRoutes from './routes/auth.routes';
import UserRoutes from './routes/user.routes';
import PostRoutes from './routes/post.routes';
import CommentRoutes from './routes/comment.routes';
import NotificationRoutes from './routes/notification.routes';
import MessageRoutes from './routes/message.routes';

// app
const app = express();

// mongoose start
dbStart();


// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(compression());

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
app.use('/api', MessageRoutes);

// get log of message
app.get("/logger", (_, res) => {
    Logger.error("This is an error log");
    Logger.warn("This is a warn log");
    Logger.info("This is a info log");
    Logger.http("This is a http log");
    Logger.debug("This is a debug log");

    res.send("Hello world");
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