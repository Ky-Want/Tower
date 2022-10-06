<template>
  <div v-if="event.creatorId == account.id" class="d-flex justify-content-end mt-3">
    <i class="fa-solid fa-trash-can selectable"></i>
  </div>
</template>




<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";

export default {

  setup() {

    return {
      account: computed(() => AppState.account),
    }
  }
}
</script>




<style lang="scss" scoped>

</style>