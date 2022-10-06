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
    AppState.events = res.data.map(a => new TowerEvent(a))
  }



  async getEventsById(id) {
    const res = await api.get(`api/events/${id}`)

    AppState.activeEvents = new TowerEvent(res.data)
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
}

export const eventsService = new EventsService()