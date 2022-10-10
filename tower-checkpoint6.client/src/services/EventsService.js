import { useRouter } from "vue-router";
import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js";
import { api } from "./AxiosService.js";


const router = useRouter()

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



  async cancelEvent(id) {
    await api.delete(`/api/events/${id}`)
    AppState.events = AppState.events.filter(eh => eh.id != id)
    AppState.activeEvents = null

    // router.push({ name: 'Home' })
  }




  async createEvent(eventData) {
    const res = await api.post('/api/events', eventData)
    const towerEvent = new TowerEvent(res.data)
    AppState.events.push(towerEvent)
    console.log('creating event: Events Service', towerEvent);
    return towerEvent
  }
}

export const eventsService = new EventsService()