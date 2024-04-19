import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: String,
  author: {type: Schema.Types.ObjectId, ref: 'Profile'}
})

const locationSchema = new Schema({
  name: String,
  photo: String,
  author: {type: Schema.Types.ObjectId, ref: "Profile"},
  content: String,
  comments: [commentSchema]
}, {
  timestamps: true
})

const Location = mongoose.model('Location', locationSchema)

export {
  Location
}