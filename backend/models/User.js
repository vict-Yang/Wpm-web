import mongoose from 'mongoose';

const Schema = mongoose.Schema

const RecentWPM = new Schema({
    WPM: {
        type: Number
    },
    time : {
        type: Date,
        default: Date.now
    }
})

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
    recentWPM: [{type: RecentWPM}],
})

const User = mongoose.model('user', UserSchema)

export default User;