<template>
  <div class="container-fluid">
    <div class="p-4 fs-2 text-light">
      <strong>Tower</strong>
    </div>

    <div class="card theatre-img">
      <div class="card-body text-light">
        <div class="mt-5 pt-4">
          <div>Get ahead of the scalpers.</div>
          <div>Reserve your seat now with</div>
          <div>real events for real people.</div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-center gap-5 mt-4 border border-dark rounded text-light bg-secondary">
      <strong>
        <div class="selectable" @click="getType('')">All</div>
      </strong>

      <strong>
        <div class="selectable" @click="getType('convention')">Conventions</div>
      </strong>

      <strong>
        <div class="selectable" @click="getType('sport')">Sports</div>
      </strong>

      <strong>
        <div class="selectable" @click="getType('digital')">Digital</div>
      </strong>

      <strong>
        <div class="selectable" @click="getType('concert')">Concerts</div>
      </strong>
    </div>

    <CreateEvent />

    <div class="row d-flex gap-5 mb-5 justify-content-center">
      <EventCard v-for="e in events" :key="e.id" :event="e" />
    </div>
  </div>
</template>



<script>
import Navbar from "../components/Navbar.vue";
import EventCard from "../components/EventCard.vue";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import { onMounted } from "vue";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { api } from "../services/AxiosService.js";
import CreateEvent from "../components/CreateEvent.vue";


export default {
  setup() {
    // const editable = ref('')

    async function getEvents() {
      try {
        await eventsService.getEvents();
      } catch (error) {
        Pop.error(error, 'getting events: Home Page')
      }
    }


    onMounted(() => {
      getEvents();
    })

    return {
      events: computed(() => AppState.events.filter(a => a.name.toUpperCase())),



      async getType(type) {
        try {
          await eventsService.getEvents(type)
        } catch (error) {
          Pop.error(error, '[Getting Event Type: Home Page]')
        }
      },



      // async deleteEvent(id) {
      //   try {
      //     Pop.confirm('[Are you sure you want to delete this event?]')
      //     const yes = await Pop.confirm('Delete this Event?')
      //     if (!yes) { return }
      //     await eventsService.deleteEvent(id)
      //   } catch (error) {
      //     Pop.error(error, '[Deleting event: Home Page]')
      //   }
      // },

      async createEvent(id) {
        const res = await api.post('/api/events', eventData)
        AppState.events.push(new Event(res.data))

        console.log('creating event: Home Page, ', createEvent(id));
      }
    };
  },
  components: { Navbar, EventCard, CreateEvent }
}
</script>





<style scoped lang="scss">
.theatre-img {
  background-image: url('https://t3.ftcdn.net/jpg/01/27/77/90/360_F_127779078_Rb5z1Va8zEqwHv5KNQId3OV21igkF6qW.jpg');
  background-size: cover;
  height: 20rem;
}

.grey {
  background-color: grey;
}
</style>
