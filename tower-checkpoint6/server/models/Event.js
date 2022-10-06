import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const EventSchema = new Schema(
  {
    creatorId: { type: ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true },
    description: { type: String },
    coverImg: { type: String },
    location: { type: String },
    capacity: { type: Number },
    startDate: { type: Date },
    isCanceled: { type: Boolean, default: false },
    type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] }
  },
  { timestamps: true, toJSON: { virtuals: true } },
)


EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})