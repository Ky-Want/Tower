import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js";
import { EventSchema } from "../models/Event.js";



class EventsService {
  createEvent(body) {
    throw new Error("Method not implemented.");
  }



  async cancelEvent(id, userInfo) {
    const event = await this.getEventById(id)

    if (event.creatorId.toString() != userInfo.id) {
      throw new Forbidden('No Swiping 🦊 events that are not yours')
    }
    // soft delete
    event.archived = true
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


  // async createEvent(eventData) {
  //   const event = await dbContext.Event.create(eventData)
  //   await event.populate('creator', 'name picture')
  //   await eventCollaboratorsService.addCollaboratorToEvent(event.id, eventData.creatorId)
  //   return event
  // }



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