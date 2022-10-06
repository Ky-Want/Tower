import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"



class TicketsService {
  async createTicket(ticketData) {
    const ticket = await dbContext.Ticket.create(ticketData)
    return ticket
  }



  async getTicketById(id) {
    const ticket = await dbContext.Ticket.findById(id) //.populate?

    // handle bad id
    if (!ticket) {
      throw new BadRequest('Invalid or Bad Event Id')
    }
    return ticket
  }



  async getAllTickets(query) {
    const events = await dbContext.Ticket.find({
      //don't include tickets to canceled events
      ...query,
    }) //populate?
    return events
  }




}


export const ticketsService = new TicketsService()