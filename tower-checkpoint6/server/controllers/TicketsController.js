import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketService.js";
import BaseController from "../utils/BaseController.js";



export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .get('', this.getTickets)
      .get('/:id', this.getTicketById)

      // .get('/:id/tickets', this.getTicketsByEventId)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:id', this.deleteTicket)
  }


  // SECTION: getting tickets
  async getTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getAllTickets(req.query)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getTicketById(req, res, next) {
    try {
      const ticket = await ticketsService.getTicketById(req.params.id)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsByAccountId(req, res, next) {
    try {
      const tickets = await ticketsService.getTicketsByAccountId(req.params.id)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsByEventId(req, res, next) {
    try {
      const tickets = await ticketsService.getTicketsByEventId(req.params.id)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }














  // SECTION: creating and removing tickets
  async createTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.createTicket(req.body)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async deleteTicket(req, res, next) {

    try {
      const ticket = await ticketsService.deleteTicket(req.params.id, req.userInfo)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
}