import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js";
import { EventSchema } from "../models/Event.js";



class EventsService {
  async cancelEvent(id, userInfo) {
    const event = await this.getEventById(id)

    // @ts-ignore
    if (event.creatorId.toString() != userInfo.id) {
      throw new Forbidden('No canceling events that are not yours')
    }
    // soft delete
    event.isCanceled = true
    await event.save()
    return event
  }



  async getEventById(id) {
    const event = await dbContext.Event.findById(id).populate('creator', 'name picture')

    // handle bad id
    if (!event) {
      throw new BadRequest('Invalid or Bad Event Id')
    }

    return event
  }


  async createEvent(eventData) {
    const event = await dbContext.Event.create(eventData)
    // await event.populate('profile', 'name picture')
    return event
  }



  async getAllEvents(query) {
    const events = await dbContext.Event.find({
      archived: false,
      ...query,
    }).populate('creator', 'name picture')
    return events
  }



  // async getEventIfNotArchived(eventId) {
  //   const event = await this.getEventById(eventId)
  //   if (event.archived) {
  //     throw new BadRequest('The event is archived')
  //   }
  //   return event
  // }
}


export const eventsService = new EventsService()