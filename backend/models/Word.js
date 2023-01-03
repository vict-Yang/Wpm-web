import mongoose from 'mongoose';

const Schema = mongoose.Schema
const WordSchema = new Schema({
    string: {
        type: String,
    }
})

const Word = mongoose.model('word', WordSchema)

export default Word;