import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const EventSchema = new Schema(
  {
    id: [{ type: String }],
    creatorId: { type: Object, required: true },
    name: { type: String, required: true },
    description: { type: String },
    coverImg: { type: String },
    location: { type: String },
    capacity: { type: Number },
    startDate: { type: Date }
  },
  { timestamps: true, toJSON: { virtuals: true } },
)


EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})