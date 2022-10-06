import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";



class EventsService {
  async getEvents(type = '') {
    let res
    if (!type) {
      res = await api.get('/api/events')
    } else {
      res = await api.get('/api/events', {
        params: {
          type: type
        }
      })

    }
    console.log('logging get Events in service', res.data);
    AppState.events = res.data.map(a => new TowerEvent(a))
  }


  // async getEvents() {
  //   AppState.events = []
  //   const res = await api.get('api/events')

  //   console.log("Getting events from service", res.data);
  // }



  async getEventsById(id) {
    AppState.events = []
    const res = await api.get('api/events', {
      params: {
        id
      }
    })
    AppState.events = res.data.map(d => new TowerEvent(d))
  }



  async deleteEvent(id) {
    const res = await api.delete(`api/events/${id}`)
    AppState.events = AppState.events.filter(c => c.id != id)
  }



  async createEvent(eventData) {
    logger.log('logging event: Events Service')
    const res = await api.post('/api/events', eventData)
    AppState.events.push(new TowerEvent(res.data))

    console.log('creating event: Events Service');
  }



  async changePage(pageUrl) {
    const res = await api.get(pageUrl)
    logger.log(res.data)

    AppState.events = res.data.events.map(e => new TowerEvent(e))
    AppState.page = res.data.page

    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
  }



  async changeEventPage(pageUrl) {
    const res = await api.get(pageUrl)
    logger.log(res.data)

    AppState.activeEvent = res.data.events.map(e => new TowerEvent(e))
    AppState.page = res.data.page

    AppState.eventNextPage = res.data.older
    AppState.eventPreviousPage = res.data.newer
  }
}

export const eventsService = new EventsService()