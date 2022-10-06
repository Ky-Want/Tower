<template>
  <div>

  </div>
</template>


<script>
import { Ticket } from "../models/Ticket.js";
import { ticketsService } from "../services/TicketsService.js";

export default {
  props: {
    ticket: {
      type: Ticket,
      required: true
    }
  },

  setup() {

    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>