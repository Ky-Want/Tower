import { AppState } from "../AppState.js"
import { Event } from "../models/Event.js";
import { api } from "./AxiosService.js";



class EventsService {
  async getEvents() {
    AppState.events = []
    const res = await api.get('api/events')
    AppState.events = res.data.map(e => new Event(e))

    console.log("Getting events from service", res.data);
  }

  async getEventsById(id) {
    AppState.events = []
    const res = await api.get('api/events', {
      params: {
        id
      }
    })

    AppState.events = res.data.map(e => new Event(e))

  }
}

export const eventsService = new EventsService()