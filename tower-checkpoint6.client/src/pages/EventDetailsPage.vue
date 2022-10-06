<template>
  <div class="p-4 fs-2 text-light">
    <h2><strong>Tower</strong></h2>
  </div>

  <div class="container d-flex gap-3 bg-grey p-5 rounded">
    <div class="col-5 rounded elevation-4 rounded">
      <img :src="event.coverImg" :alt="event.name" class="img-fluid rounded">
    </div>

    <div class="col-7">
      <div class="mb-3 d-flex justify-content-between">
        <h3>{{event.name}}</h3>
        <p>Starting Date: {{new Date(event.startDate).toLocaleDateString()}}</p>
      </div>

      <div class="mb-3 d-flex justify-content-between">
        <em>{{event.location}}</em>
        <p>Starting Time: {{new Date(event.startDate).toLocaleTimeString()}}</p>
      </div>

      <div class="mb-3 pb-2">
        <strong>{{event.description}}</strong>
      </div>

      <div class="d-flex justify-content-between">
        <p class="text-green"><strong>{{event.capacity}} spots left</strong></p>
        <button class="text-dark bg-primary">ATTEND</button>
      </div>

      <DeleteEvent @click="cancelEvent(id)" />
    </div>
  </div>


  <!-- TODO: add comments here -->
</template>



<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import EventCard from '../components/EventCard.vue';
import DeleteEvent from "../components/DeleteEvent.vue";



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
      account: computed(() => AppState.account),
      event: computed(() => AppState.activeEvents),


      async cancelEvent(id) {
        try {
          await Pop.confirm('Are you sure you want to delete this Event?')
          await eventsService.cancelEvent(id)
        } catch (error) {
          console.error(error, 'Deleting Post: Event Details page')
        }
      }
    };
  },
  components: { EventCard, DeleteEvent }
}
</script>





<style lang="scss" scoped>
.text-green {
  color: green;
}
</style>