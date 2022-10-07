import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"
import { eventsService } from "./EventsService.js"



class TicketsService {
  async getAllTickets(query) {
    const tickets = await dbContext.Ticket.find({
      isCanceled: false,
      ...query
    }).populate('account', 'name picture')
    return tickets
  }



  async getTicketsByAccountId(accountId) {
    const attendees = await dbContext.Account.find({ accountId })
      .populate('account', 'title coverImg')

    return attendees
  }



  async getTicketsByProfileId(profileId) {
    const attendees = await dbContext.Account.find({ profileId })
      .populate('profile', 'name picture')

    return attendees
  }



  async getTicketById(id) {
    const ticket = await dbContext.Ticket.findById(id).populate('account', 'name picture')

    // handle bad id
    if (!ticket) {
      throw new BadRequest('Invalid or Bad ticket Id.')
    }
    return ticket
  }



  async addTicket(ticketData) {
    const event = await dbContext.Event.findById(ticketData.eventId)
    if (event.capacity == 0) {
      throw new BadRequest('No tickets available.')
    }

    const ticket = await dbContext.Ticket.create(ticketData)
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event')

    // @ts-ignore
    event.capacity--

    await event.save()
    return ticket
  }


  async addAttendeeToEvent(eventId, accountId) {
    await eventsService.getEventIfNotCanceled(eventId)
    const isAttendee = await this.getAttendeeForEvent(eventId, accountId)

    if (isAttendee) {
      return isAttendee
    }

    const attendee = await dbContext.Account.create(eventId, accountId)
    await attendee.populate('profile', 'name picture')

    return attendee
  }



  async getAttendeeForEvent(eventId, accountId) {
    const attendee = await dbContext.Account.findOne({ eventId, accountId })
      .populate('profile', 'name picture')
      .populate('event', 'title coverImg')

    return attendee
  }



  async deleteTicket(id, userInfo) {
    const ticket = await this.getTicketById(id)

    // @ts-ignore
    if (ticket.accountId.toString() != userInfo.id) {
      throw new Forbidden('No canceling tickets that are not yours')
    }
    // soft delete

    await ticket.save()
    return ticket
  }



  async removeAttendee(attendeeId, userId) {
    const attendee = await dbContext.Account.findById(attendeeId)
    if (!attendee) {
      throw new BadRequest('Invalid attendee Id')
    }

    // NOTE use .toString() when comparing an id from the db to an id from the client

    const event = await eventsService.getEventById(attendee.eventId)
    // @ts-ignore
    const theLoggedInUserIsTheOwner = userId == event.creatorId.toString()
    // @ts-ignore
    const theLoggedInUserIsTheAttendee = attendee.accountId.toString() == userId

    if (!theLoggedInUserIsTheAttendee && !theLoggedInUserIsTheOwner) {
      throw new Forbidden("You can't remove anyone but yourself.")
    }

    await attendee.remove()
    return attendee
  }

}


export const ticketsService = new TicketsService()