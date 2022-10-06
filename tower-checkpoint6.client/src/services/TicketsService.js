import { api } from "./AxiosService.js"



class TicketsService {
  async getTickets() {
    const res = await api.get('api/tickets')
    AppState.tickets = res.data.map(c => new Ticket(c))

  }
}

export const ticketsService = new TicketsService()