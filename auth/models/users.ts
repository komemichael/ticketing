import mongoose from 'mongoose';
import { Password } from '../services/password';

interface UserAttrs{ 
    email: string;
    password: string;
};

interface UserModel extends mongoose.Model<UserDocument>{
    build(attrs: UserAttrs): UserDocument;
}

interface UserDocument extends mongoose.Document<any>{
    email: string;
    password: string;
}

const user_schema = new mongoose.Schema({
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    }
});

user_schema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

user_schema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(
            this.get('password'));
        this.set('password', hashed);
    }
    done();
});

const User = mongoose.model<UserDocument, UserModel>(
    'User', user_schema);

export { User };