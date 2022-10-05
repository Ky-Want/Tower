import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";



export class EventController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:id', this.getEventById)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.cancelEvent)
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