<template>
  <div class="mb-3 d-flex justify-content-between">
    <h3>{{event.name}}</h3>
    <p>Starting Date: {{new Date(event.startDate).toLocaleDateString()}}</p>
  </div>

  <div class="mb-3 d-flex justify-content-between">
    <em>{{event.location}}</em>
  </div>

  <div class="mb-3 pb-2">
    <strong>{{event.description}}</strong>
  </div>

  <div class="d-flex justify-content-between">
    <p class="text-green"><strong>{{event.capacity}} spots left</strong></p>
    <button class="text-dark bg-primary">ATTEND</button>
  </div>
</template>


<script>
export default {
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>