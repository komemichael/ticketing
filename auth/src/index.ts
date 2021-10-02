import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import  'express-async-errors';
import { current_user_router } from './routes/current-user';
import { signup_router } from './routes/signup';
import { signin_router } from './routes/signin';
import { signout_router } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.set('trust proxy', true);

app.use(express.json());
app.use(cookieSession({  
    signed: false,
    secure: true,
 }));

app.use(current_user_router);
app.use(signup_router);
app.use(signin_router);
app.use(signout_router);

app.get('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    if (!process.env.JWT_KEY)
        throw new Error('JWT Key must be provided');
        
    try {
        const c = 'mongodb://auth-mongo-srv:27017/auth';
        await mongoose.connect(c);
        console.log('connected to mongodb');
    } catch (error) {
        console.log(error);
    }

    app.listen(3000, () => {
        console.log('Running on Port 3000!!')
    });
}


// start();
app.listen(3000, () => {
    console.log('Running on Port 3000!!')
});
