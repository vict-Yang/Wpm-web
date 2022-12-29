import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ArticleSchema = Schema({
    id: { type: String, required: true },
    img: { type: String, required: true },
    name: { type: String, required: true },
    content: { type: String, required: true }
}, {
    collection: 'Article',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const exportSchema = mongoose.model('Article', ArticleSchema)

export default exportSchema
