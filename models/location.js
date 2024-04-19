import mongoose from 'mongoose'

const Schema = mongoose.Schema

const locationSchema = new Schema({
  name: String,
  photo: String,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Location = mongoose.model('Location', locationSchema)

export {
  Location
}