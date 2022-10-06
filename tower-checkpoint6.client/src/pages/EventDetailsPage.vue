<template>
  <div class="p-4 fs-2 text-light">
    <h2><strong>Tower</strong></h2>
  </div>

  <!-- SECTION: event details -->
  <div class="container d-flex gap-3 bg-grey p-5 rounded mb-5">
    <div class="col-5 rounded elevation-4 rounded">
      <img :src="event.coverImg" :alt="event.name" class="img-fluid rounded">
    </div>

    <div class="col-7">

      <EventDetails />

      <DeleteEvent @click="cancelEvent(id)" />
    </div>
  </div>


  <!-- SECTION: ticket holders pics -->
  <div class="container mt-5 mb-5">
    <div class="bg-dark rounded p-3">
      <!-- {{tickets.account.picture}} -->
      Attendees pics will go here
    </div>
  </div>

  <CommentsCard />
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
import { ticketsService } from "../services/TicketsService.js";
import CommentsCard from "../components/CommentsCard.vue";
import EventDetails from "../components/EventDetails.vue";



export default {
  setup() {
    const route = useRoute();
    const router = useRouter();


    async function getTickets() {
      try {
        await ticketsService.getTickets()
      } catch (error) {
        Pop.error("Cannot find tickets")
      }
    }


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
      getTickets();
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
  components: { EventCard, DeleteEvent, CommentsCard, EventDetails }
}
</script>





<style lang="scss" scoped>
.text-green {
  color: green;
}

.commentBtn {
  height: 2rem;
  width: 8rem;
}

.comment-pic {
  height: 4rem;
  width: 4rem;
}
</style>