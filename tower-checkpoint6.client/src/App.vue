<template>
  <header>
    <Navbar />
  </header>

  <main class="grey">
    <router-view />
  </main>

  <footer>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import HomePage from "./pages/HomePage.vue"

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, HomePage }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.grey {
  background-color: grey;
}
</style>
