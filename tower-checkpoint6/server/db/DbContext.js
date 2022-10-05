import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { EventSchema } from "../models/Event.js";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);

  Account = mongoose.model('Account', AccountSchema);

  Event = mongoose.model('Event', EventSchema)
}

export const dbContext = new DbContext()
