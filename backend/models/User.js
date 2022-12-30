import mongoose from 'mongoose';

const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    hash: {
        type: String,
        required: [true, 'Hash field is required.']
    },
    bestWPM: {
        type: Number,
        default: 0,
    },
    wpmRecent: [{type: Number}],
})

const User = mongoose.model('user', UserSchema)

export default User;