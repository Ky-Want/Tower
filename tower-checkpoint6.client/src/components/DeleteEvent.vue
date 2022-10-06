<template>
  <div class="d-flex justify-content-end mt-3">
    <i class="fa-solid fa-trash-can selectable" @click="cancelEvent(id)"></i>
  </div>
</template>




<script>
import { eventsService } from "../services/EventsService.js"
import Pop from "../utils/Pop.js"

export default {

  setup() {
    return {
      async cancelEvent(id) {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete this event?')
          if (!yes) { return }
          await eventsService.cancelEvent(id)
        } catch (error) {
          Pop.error(error, '[Deleting event: Home Page]')
        }
      },
    }
  }
}
</script>




<style lang="scss" scoped>

</style>