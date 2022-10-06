<template>
  <div class="mt-3 col-3">
    <div class="card px-2 py-2">
      <router-link :to="{name: 'EventDetails', params: {id: event.id}} ">
        <img :src="event.coverImg" alt="Event image" class="img-fluid event-cover rounded selectable">
      </router-link>

      <div>
        <div class="pb-1">
          <strong>{{event.name}}</strong>
        </div>

        <div class="pb-1">
          <em>{{event.location}}</em>
        </div>

        <div class="pb-1">
          {{new Date(event.startDate).toLocaleDateString()}}
        </div>
      </div>


      <div class="d-flex justify-content-end mt-2">
        <div v-if="event.capacity <= 0" class="text-dark bg-danger rounded p-1 px-2">
          At Capacity
        </div>

        <div v-if="event.capacity >= 1" class="text-success">
          {{event.capacity}} spots left
        </div>

        <div v-else="event.isCanceled == true" class="text-dark bg-danger rounded p-1 px-2">
          Canceled
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from "../AppState.js";
import { computed } from "@vue/reactivity";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { TowerEvent } from "../models/TowerEvent.js";

export default {
  props: {
    event: {
      type: TowerEvent,
      required: true
    }
  },


  setup(props) {
    return {
      account: computed(() => AppState.account),


      async deleteEvent(id) {
        try {
          await Pop.confirm('Are you sure you want to delete this Event?')
          await eventsService.deleteEvent(id)
        } catch (error) {
          console.error(error, 'Deleting Post: Event Card')
        }
      }
    }
  }
}
</script>




<style lang="scss" scoped>

</style>