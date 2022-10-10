<template>
  <i class="fa-solid fa-circle-plus text-light d-flex justify-content-end sticky-bottom fs-2 pb-4 pt-2"
    data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"></i>


  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <label for="eventType">What type of event is it?</label>
    <select name="eventType" v-model="editable.eventType">
      <option value="concert">Concert</option>
      <option value="convention">Convention</option>
      <option value="sport">Sport</option>
      <option value="digital">Digital</option>
    </select>
  </div>

  <!-- SECTION: create concert form -->
  <div v-if="editable.eventType == 'concert'">
    <div class="form-group mb-3">
      <input type="text" v-model="editable.name" placeholder="Concert Name" required class="form-control">
    </div>

    <div class="form-group mb-3">
      <input type="text" v-model="editable.location" placeholder="Location" required class="form-control">
    </div>

    <div class="form-group mb-3">
      <input type="url" v-model="editable.coverImg" placeholder="https://youknow.com" class="form-control">
    </div>

    <div class="form-group mb-3">
      <input type="number" v-model="editable.capacity" placeholder="Capacity" required class="form-control" min="0">
    </div>

    <div class="form-group mb-3">
      <input type="date" v-model="editable.startDate" placeholder="month/day/year" required class="form-control">
    </div>

    <div class="form-group mb-3">
      <textarea v-model="editable.description" placeholder="description" class="form-control" rows="4"></textarea>
    </div>
    <div class="d-flex justify-content-center">
      <button class="mb-5" type="submit" style=" width: 20vw;" @click="handleSubmit()">Post</button>
    </div>
  </div>


  <!-- SECTION: create convention form -->
  <div v-if="editable.eventType == 'convention'">
    <div class="form-group mb-3">
      <input type="text" v-model="editable.name" placeholder="Convention Name" required class="form-control">
    </div>

    <div class="form-group mb-3">
      <input type="text" v-model="editable.location" placeholder="Location" required class="form-control">
    </div>

    <div class="form-group mb-3">
      <input type="url" v-model="editable.coverImg" placeholder="https://youknow.com" class="form-control">
    </div>

    <div class="form-group mb-3">
      <input type="number" v-model="editable.capacity" placeholder="Capacity" required class="form-control" min="0">
    </div>

    <div class="form-group mb-3">
      <input type="date" v-model="editable.startDate" placeholder="month/day/year" required class="form-control">
    </div>

    <div class="form-group mb-3">
      <textarea v-model="editable.description" placeholder="description" class="form-control" rows="4"></textarea>
    </div>
    <div class="d-flex justify-content-center">
      <button class="mb-5" type="submit" style="width: 20vw;" @click="handleSubmit()">Post</button>
    </div>
  </div>


  <!-- SECTION: create sport form -->
  <div v-if="editable.eventType == 'sport'">
    <div class="form-group mb-3">
      <input type="text" v-model="editable.name" placeholder="Sport Name" required class="form-control">
    </div>

    <div class="form-group mb-3">
      <input type="text" v-model="editable.location" placeholder="Location" required class="form-control">
    </div>

    <div class="form-group mb-3">
      <input type="url" v-model="editable.coverImg" placeholder="https://youknow.com" class="form-control">
    </div>

    <div class="form-group mb-3">
      <input type="number" v-model="editable.capacity" placeholder="Capacity" required class="form-control" min="0">
    </div>

    <div class="form-group mb-3">
      <input type="date" v-model="editable.startDate" placeholder="month/day/year" required class="form-control">
    </div>

    <div class="form-group mb-3">
      <textarea v-model="editable.description" placeholder="description" class="form-control" rows="4"></textarea>
    </div>
    <div class="d-flex justify-content-center">
      <button class="mb-5" type="submit" style=" width: 20vw;" @click="handleSubmit()">Post</button>
    </div>
  </div>


  <!-- SECTION: create digital form -->
  <div v-if="editable.eventType == 'digital'">
    <div class="form-group mb-3">
      <input type="text" v-model="editable.name" placeholder="Digital Name" required class="form-control">
    </div>

    <div class="form-group mb-3">
      <input type="text" v-model="editable.location" placeholder="Location" required class="form-control">
    </div>

    <div class="form-group mb-3">
      <input type="url" v-model="editable.coverImg" placeholder="https://youknow.com" class="form-control">
    </div>

    <div class="form-group mb-3">
      <input type="number" v-model="editable.capacity" placeholder="Capacity" required class="form-control" min="0">
    </div>

    <div class="form-group mb-3">
      <input type="date" v-model="editable.startDate" placeholder="month/day/year" required class="form-control">
    </div>

    <div class="form-group mb-3">
      <textarea v-model="editable.description" placeholder="description" class="form-control" rows="4"></textarea>
    </div>
    <div class="d-flex justify-content-center">
      <button class="mb-5" type="submit" style=" width: 20vw;" @click="handleSubmit()">Post</button>
    </div>
  </div>
</template>


<script>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { eventsService } from "../services/EventsService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"


export default {
  setup() {
    const editable = ref({});
    const router = useRouter();

    return {
      editable,
      async handleSubmit() {
        try {
          const eventData = editable.value
          let newEvent = await eventsService.createEvent(eventData)

          router.push({
            name: "EventDetails",
            params: { id: newEvent.id }
          });

          console.log('Sending form');

        } catch (error) {
          Pop.error(error, '[Submitting Event Form failed]')
          logger.error(error, 'submitting create event form')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>