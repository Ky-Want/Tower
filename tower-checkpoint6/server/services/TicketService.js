import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"



class TicketsService {
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



  async getTicketById(id) {
    const ticket = await dbContext.Ticket.findById(id).populate('account', 'name picture')

    // handle bad id
    if (!ticket) {
      throw new BadRequest('Invalid or Bad ticket Id.')
    }
    return ticket
  }



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



  async getAllTickets(query) {
    const tickets = await dbContext.Ticket.find({
      isCanceled: false,
      ...query,
    }).populate('account', 'name picture')
    return tickets
  }



  async getTicketIfNotCanceled() {

  }
}


export const ticketsService = new TicketsService()