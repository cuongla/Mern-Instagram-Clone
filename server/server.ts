require('dotenv').config();
import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.json({ msg: 'hello' })
});

// connect to db
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log(`Connecting to mongodb`)
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listning to port ${port}`));