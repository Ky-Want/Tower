import { api } from "./AxiosService.js"



class TicketsService {
  async getTickets() {
    const res = await api.get('api/tickets')
    AppState.tickets = res.data.map(c => new Ticket(c))
  }


  async getTicketsById(id) {
    const res = await api.get(`api/tickets/${id}`)

    AppState.activeTicket = new TowerEvent(res.data)
  }


  async getTicketsByUser() {

  }










  async addTicket() {

  }


  async removeTicket() {

  }

}

export const ticketsService = new TicketsService()