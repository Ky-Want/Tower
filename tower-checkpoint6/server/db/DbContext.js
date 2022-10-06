import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { EventSchema } from "../models/Event.js";
import { TicketSchema } from "../models/Ticket.js";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);

  Account = mongoose.model('Profile', AccountSchema);

  Event = mongoose.model('Event', EventSchema)

  Ticket = mongoose.model('Ticket', TicketSchema)
}

export const dbContext = new DbContext()