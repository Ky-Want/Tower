import { useRouter } from "vue-router";
import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { api } from "./AxiosService.js";


const router = useRouter()

class EventsService {


  async getEvents(type = '') {
    try {
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
    } catch (error) {
      logger.error(error, 'getting events by type in service')
      Pop.error('getting events by type in service failed')
    }
  }



  async getEventsById(id) {
    try {
      const res = await api.get(`api/events/${id}`)
      AppState.activeEvents = new TowerEvent(res.data)
    } catch (error) {
      logger.error(error, 'getting events by id in service')
      Pop.error('getting events by id in service failed')
    }
  }



  async cancelEvent(id) {
    try {
      await api.delete(`/api/events/${id}`)
      AppState.events = AppState.events.filter(eh => eh.id != id)
      AppState.activeEvents = null
    } catch (error) {
      logger.error(error, 'canceling event in service')
      Pop.error('canceling event in service failed')
    }
  }




  async createEvent(eventData) {
    try {
      const res = await api.post('/api/events', eventData)
      const towerEvent = new TowerEvent(res.data)
      AppState.events.push(towerEvent)
      console.log('creating event: Events Service', towerEvent);
      return towerEvent
    } catch (error) {
      logger.error(error, 'creating event in service')
      Pop.error('creating event in service failed')
    }
  }
}

export const eventsService = new EventsService()