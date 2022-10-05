<template>
  <div>
    This is the home page
    <!-- <EventsCard v-for="e in events" :key="e.id" :event="e" /> -->
  </div>
</template>



<script>
import EventsCard from "../components/EventsCard.vue";
export default {
  setup() {
    return {};
  },
  components: { EventsCard }
}
</script>



<style scoped lang="scss">

</style>
