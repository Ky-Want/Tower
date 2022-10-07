import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"
import { eventsService } from "./EventsService.js"



class TicketsService {
  // SECTION: getting the tickets
  async getAllTickets(query) {
    const tickets = await dbContext.Ticket.find({
      isCanceled: false,
      ...query
    }).populate('profile', 'name picture')
    return tickets
  }

  async getTicketById(id) {
    const ticket = await dbContext.Ticket.findById(id).populate('profile', 'name picture')
    if (!ticket) { throw new BadRequest('Invalid or Bad ticket Id.') }
    return ticket
  }

  async getTicketsByAccountId(accountId) {
    const tickets = await dbContext.Account.find({ accountId })
      .populate('profile', 'name picture')
    return tickets
  }

  async getAttendeesByEventId(accountId) {
    const attendees = await dbContext.Account.find({ accountId }).populate('profile', 'name picture')
    return attendees
  }

  // async getTicketsByProfileId(profileId) {
  //   const tickets = await dbContext.Account.find({ profileId })
  //     .populate('profile', 'name picture')
  //   return tickets
  // }

  async getAttendeeForEvent(eventId, accountId) {
    const attendee = await dbContext.Account.findOne({ eventId, accountId })
      .populate('profile', 'name picture')
      .populate('event', 'title coverImg')
    return attendee
  }








  // SECTION: creating and removing tickets
  async createTicket(ticketData) {
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


  async deleteTicket(id, userInfo) {
    const ticket = await this.getTicketById(id)
    const event = await dbContext.Event.findById(ticket.eventId)

    // @ts-ignore
    if (ticket.accountId.toString() != userInfo.id) {
      throw new Forbidden('No canceling tickets that are not yours')
    }

    // @ts-ignore
    event.capacity++

    await ticket.remove()
    await event.save()
    return ticket
  }








  // SECTION: add and remove attendees
  async addAttendeeToEvent(eventId, accountId) {
    const isAttendee = await this.getAttendeeForEvent(eventId, accountId)
    const attendee = await dbContext.Account.create(eventId, accountId)

    await eventsService.getEventIfNotCanceled(eventId)
    await attendee.populate('profile', 'name picture')

    if (isAttendee) {
      return isAttendee
    }

    return attendee
  }

  async removeAttendee(attendeeId, userId) {
    // NOTE use .toString() when comparing an id from the db to an id from the client
    const attendee = await dbContext.Account.findById(attendeeId)
    const event = await eventsService.getEventById(attendee.eventId)
    // @ts-ignore
    const loggedInUserIsTheOwner = userId == event.creatorId.toString()
    const loggedInUserIsTheAttendee = attendee.accountId.toString() == userId


    if (!attendee) {
      throw new BadRequest('Invalid attendee Id')
    }

    if (!loggedInUserIsTheAttendee && !loggedInUserIsTheOwner) {
      throw new Forbidden("You can't remove anyone but yourself.")
    }

    await attendee.remove()
    return attendee
  }

}


export const ticketsService = new TicketsService()