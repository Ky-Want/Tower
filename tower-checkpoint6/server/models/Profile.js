import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ProfileSchema = new Schema(
  {
    id: [{ type: String, unique: true }],
    name: { type: String },
    picture: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)