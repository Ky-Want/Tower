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
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" v-model="editable.activeEvents.name" placeholder="Name" required class="form-control">
    </div>

    <div class="form-group">
      <label for="location">Location:</label>
      <input type="text" v-model="editable.events.location" placeholder="Location" required class="form-control">
    </div>

    <div class="form-group">
      <label for="coverImg">Cover Image:</label>
      <input type="url" v-model="editable.events.coverImg" placeholder="https://youknow.com" class="form-control">
    </div>

    <div class="form-group">
      <label for="capacity">Capacity:</label>
      <input type="number" v-model="editable.events.capacity" placeholder="Capacity" required class="form-control"
        min="0">
    </div>

    <div class="form-group">
      <label for="startDate">Start Date:</label>
      <input type="number" v-model="editable.events.startDate" placeholder="Date" required class="form-control">
    </div>

    <div class="form-group">
      <label for="description">Description:</label>
      <textarea v-model="editable.events.description" placeholder="description" class="form-control"
        rows="4"></textarea>
    </div>
  </div>


  <!-- SECTION: create convention form -->
  <div v-if="editable.eventType == 'convention'">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" v-model="editable.events.name" placeholder="Name" required class="form-control">
    </div>

    <div class="form-group">
      <label for="location">Location:</label>
      <input type="text" v-model="editable.events.location" placeholder="Location" required class="form-control">
    </div>

    <div class="form-group">
      <label for="coverImg">Cover Image:</label>
      <input type="url" v-model="editable.events.coverImg" placeholder="https://youknow.com" class="form-control">
    </div>

    <div class="form-group">
      <label for="capacity">Capacity:</label>
      <input type="number" v-model="editable.events.capacity" placeholder="Capacity" required class="form-control"
        min="0">
    </div>

    <div class="form-group">
      <label for="startDate">Start Date:</label>
      <input type="number" v-model="editable.events.startDate" placeholder="Date" required class="form-control">
    </div>

    <div class="form-group">
      <label for="description">Description:</label>
      <textarea v-model="editable.events.description" placeholder="description" class="form-control"
        rows="4"></textarea>
    </div>
  </div>

  <!-- SECTION: create sport form -->
  <div v-if="editable.eventType == 'sport'">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" v-model="editable.events.name" placeholder="Name" required class="form-control">
    </div>

    <div class="form-group">
      <label for="location">Location:</label>
      <input type="text" v-model="editable.events.location" placeholder="Location" required class="form-control">
    </div>

    <div class="form-group">
      <label for="coverImg">Cover Image:</label>
      <input type="url" v-model="editable.events.coverImg" placeholder="https://youknow.com" class="form-control">
    </div>

    <div class="form-group">
      <label for="capacity">Capacity:</label>
      <input type="number" v-model="editable.events.capacity" placeholder="Capacity" required class="form-control"
        min="0">
    </div>

    <div class="form-group">
      <label for="startDate">Start Date:</label>
      <input type="number" v-model="editable.events.startDate" placeholder="Date" required class="form-control">
    </div>

    <div class="form-group">
      <label for="description">Description:</label>
      <textarea v-model="editable.events.description" placeholder="description" class="form-control"
        rows="4"></textarea>
    </div>
  </div>

  <!-- SECTION: create digital form -->
  <div v-if="editable.eventType == 'digital'">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" v-model="editable.events.name" placeholder="Name" required class="form-control">
    </div>

    <div class="form-group">
      <label for="location">Location:</label>
      <input type="text" v-model="editable.events.location" placeholder="Location" required class="form-control">
    </div>

    <div class="form-group">
      <label for="coverImg">Cover Image:</label>
      <input type="url" v-model="editable.events.coverImg" placeholder="https://youknow.com" class="form-control">
    </div>

    <div class="form-group">
      <label for="capacity">Capacity:</label>
      <input type="number" v-model="editable.events.capacity" placeholder="Capacity" required class="form-control"
        min="0">
    </div>

    <div class="form-group">
      <label for="startDate">Start Date:</label>
      <input type="number" v-model="editable.events.startDate" placeholder="Date" required class="form-control">
    </div>

    <div class="form-group">
      <label for="description">Description:</label>
      <textarea v-model="editable.events.description" placeholder="description" class="form-control"
        rows="4"></textarea>
    </div>


    <div class="d-flex justify-content-center">
      <button class="mb-5" type="submit" style=" width: 20vw;">Post</button>
    </div>
  </div>
</template>


<script>
import { ref } from "vue"
import { eventsService } from "../services/EventsService.js"
import Pop from "../utils/Pop.js"


export default {
  setup() {
    const editable = ref({
      listing: {}
    })
    return {
      editable,
      async handleSubmit() {
        try {
          const eventData = editable.value
          await eventsService.createEvent(eventData)
          editable.value = {
            listing: {}
          }
        } catch (error) {
          Pop.error(error, '[Submitting Event Form]')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>