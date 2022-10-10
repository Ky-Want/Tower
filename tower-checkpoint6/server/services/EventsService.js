import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js";



class EventsService {
  async cleanup() {
    await dbContext.Event.deleteMany()
    await dbContext.Ticket.deleteMany()
    await dbContext.Comment.deleteMany()
  }
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
    return event
  }



  async getAllEvents(query) {
    const events = await dbContext.Event.find({
      ...query,
    }).populate('creator', 'name picture')
    return events
  }



  async getEventIfNotCanceled(eventId) {
    const event = await this.getEventById(eventId)
    if (event.isCanceled) {
      throw new BadRequest('The event is canceled')
    }
    return event
  }



  async editEvent(eventId, eventData, userInfo) {
    const event = await this.getEventById(eventId)

    // @ts-ignore
    if (userInfo.id != event.creatorId.toString() || event.isCanceled == true) {
      throw new Forbidden('This is not your event.')
    }
    event.name = eventData.name || event.name
    event.description = eventData.description || event.description
    event.location = eventData.location || event.location
    event.capacity = eventData.capacity || event.capacity
    event.startDate = eventData.startDate || event.startDate
    event.coverImg = eventData.coverImg || event.coverImg

    await event.save()

    return event
  }
}


export const eventsService = new EventsService()