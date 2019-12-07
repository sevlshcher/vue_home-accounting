<template>
  <div class="app-main-layout">

    <Navbar @click="isOpen = !isOpen"/>

    <Sidebar v-model="isOpen"/>

    <main
      :class="{full: !isOpen}"
      class="app-content">
      <div class="app-page">
        <router-view/>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link
        to="/record"
        class="btn-floating btn-large blue">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
export default {
  data: () => ({
    isOpen: true
  }),
  components: {
    Navbar,
    Sidebar
  }
}
</script>