import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"



class TicketsService {
  async getMyTickets() {
    try {
      const res = await api.get('account/tickets')
      AppState.myTickets = res.data.map(c => new Ticket(c))
    } catch (error) {
      logger.error(error, 'getting my tickets in service')
      Pop.error('getting my tickets in service failed')
    }
  }


  async getTicketsByEventId(id) {
    try {
      const res = await api.get(`api/events/${id}/tickets`)
      AppState.tickets = res.data.map(t => new Ticket(t))

      console.log('get tickets by event id: ', res.data);
    } catch (error) {
      console.error('get tickets by event id Failed')
      Pop.error('getting tickets by event id failed')
    }
  }


  async addTicket(ticketData) {
    try {
      const res = await api.post('/api/tickets', ticketData)
      AppState.tickets.push(new Ticket(res.data))
    } catch (error) {
      logger.error(error, 'adding ticket in service')
      Pop.error('adding ticket in service failed')
    }
  }


  async removeTicket() {

  }

}

export const ticketsService = new TicketsService()