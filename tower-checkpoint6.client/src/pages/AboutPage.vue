<template>
  <div class="p-3">
    <h1>TOWER</h1>
  </div>
  <div class="p-3">
    Events being attended...
  </div>

  <TicketCard v-for="e in tickets" :key="e.id" :ticket="e" />
</template>




<script>
import { onMounted } from "vue";
import TicketCard from "../components/TicketCard.vue";
import { ticketsService } from "../services/TicketsService.js";



export default {

  setup() {
    async function getTickets() {
      try {
        await ticketsService.getTickets();
      } catch (error) {
        Pop.error(error, 'getting tickets: About/profile Page')
      }
    }


    onMounted(() => {
      getTickets();
    })


    return {
      tickets: computed(() => AppState.tickets),

    };
  },

  components: { TicketCard }
}
</script>




<style>

</style>