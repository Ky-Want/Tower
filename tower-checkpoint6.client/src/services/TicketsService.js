import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { api } from "./AxiosService.js"



class TicketsService {
  async getMyTickets() {
    const res = await api.get('account/tickets')
    AppState.myTickets = res.data.map(c => new Ticket(c))
  }


  async getTicketsByEventId(id) {
    try {
      const res = await api.get(`api/events/${id}/tickets`)
      AppState.tickets = res.data.map(t => new Ticket(t))

      console.log('get tickets by event id: ', res.data);
    } catch (error) {
      console.error('get tickets by event id Failed')
    }
  }


  async addTicket(ticketData) {
    const res = await api.post('/api/tickets', ticketData)
    AppState.tickets.push(new Ticket(res.data))
  }


  async removeTicket() {

  }

}

export const ticketsService = new TicketsService()