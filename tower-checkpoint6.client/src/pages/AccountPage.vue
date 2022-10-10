<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>


    <div>
      <h4>
        Your Tickets
      </h4>
      <div>
        <TicketCard v-for="e in tickets" :key="e.id" :ticket="e" />
      </div>
    </div>

  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import TicketCard from "../components/TicketCard.vue";
import { ticketsService } from "../services/TicketsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    async function getTickets() {
      try {
        await ticketsService.getMyTickets();
      }
      catch (error) {
        Pop.error(error, "getting tickets: About/profile Page");
      }
    }
    onMounted(() => {
      getTickets();
    });
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.myTickets),
    };
  },
  components: { TicketCard }
}
</script>

<style scoped>

</style>
