import { api } from "./AxiosService.js"



class TicketsService {
  async getTickets() {
    const res = await api.get('api/tickets')
    AppState.tickets = res.data.map(c => new Ticket(c))
  }



  async getTicketsById(id) { }



  async getTicketsByUser() { }
}

export const ticketsService = new TicketsService()