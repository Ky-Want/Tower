import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentService.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketService.js";
import BaseController from "../utils/BaseController.js";


export class EventController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:id', this.getEventById)

      .get('/:id/tickets', this.getTicketsByEventId)
      .get('/:id/comments', this.getCommentsByEventId)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.cancelEvent)

  }



  // SECTION: getting events
  async getTicketsByEventId(req, res, next) {
    try {
      const eventTickets = await ticketsService.getTicketsByEventId(req.params.id)
      res.send(eventTickets)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByEventId(req, res, next) {
    try {
      const comments = await commentsService.getCommentsByEventId(req.params.id)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }



  async getAllEvents(req, res, next) {
    try {
      const events = await eventsService.getAllEvents(req.query)
      res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const event = await eventsService.getEventById(req.params.id)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }









  // SECTION: creating/deleting/and editing events
  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(req.body)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }


  async cancelEvent(req, res, next) {
    try {
      const event = await eventsService.cancelEvent(req.params.id, req.userInfo)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }


  async editEvent(req, res, next) {
    try {
      const event = await eventsService.editEvent(req.params.id, req.body, req.userInfo)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
}