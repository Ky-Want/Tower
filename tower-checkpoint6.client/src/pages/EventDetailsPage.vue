<template>
  <div class="p-4 fs-2 text-light">
    <h2><strong>Tower</strong></h2>
  </div>

  <div class="container d-flex gap-3">
    <div class="col-5 card rounded">
      <img :src="event.coverImg" :alt="event.name" class="rounded img-fluid">
    </div>

    <div class="col-7">
      <div class="mb-4 d-flex justify-content-between">
        <p>{{event.name}}</p>
        <p>Starting Date: {{new Date(event.startDate).toLocaleDateString()}}</p>
      </div>

      <div class="mb-4 d-flex justify-content-between">
        <p>{{event.location}}</p>
        <p>Starting Time: {{new Date(event.startDate).toLocaleTimeString()}}</p>
      </div>

      <div>
        <strong><em>{{event.description}}</em></strong>
      </div>

      <div class="mt-5 pt-5 d-flex justify-content-between">
        <p class="text-success">{{event.capacity}} spots left</p>
        <button class="text-dark bg-primary">ATTEND</button>
      </div>
    </div>
  </div>


  <!-- SECTION: add comments here -->
</template>



<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import EventCard from '../components/EventCard.vue';



export default {
  setup() {
    const route = useRoute();
    const router = useRouter();


    async function getEventById() {
      try {
        await eventsService.getEventsById(route.params.id);
      }
      catch (error) {
        Pop.error("Sorry that event no longer exists", "[GettingEvent]");
        router.push({ name: "Home" });
      }
    }
    onMounted(() => {
      getEventById();
    });
    return {
      event: computed(() => AppState.activeEvents)
    };
  },



  async deleteEvent(id) {
    try {
      Pop.confirm('[Are you sure you want to delete this event?]')
      const yes = await Pop.confirm('Delete this Event?')
      if (!yes) { return }
      await eventsService.deleteEvent(id)
    } catch (error) {
      Pop.error(error, '[Deleting event: Home Page]')
    }
  },
  components: { EventCard }
}
</script>





<style lang="scss" scoped>

</style>