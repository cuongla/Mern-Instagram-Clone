import mongoose from 'mongoose';

const dbStart = async () => {
    const connected: boolean = await connectToDb();
    if (!connected) {
        process.exit(1);
    }
}

const connectToDb = async (): Promise<boolean> => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI as string,
            {
                useCreateIndex: true,
                useFindAndModify: false,
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log(`Connected to mongoDB`);
        return true;
    } catch (error) {
        console.log(`Error occured while connecting to database`, error);
        return false;
    }
}

export { dbStart }