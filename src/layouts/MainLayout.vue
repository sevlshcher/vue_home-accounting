<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">

      <Navbar @click="isOpen = !isOpen"/>

      <Sidebar v-model="isOpen" :key="locale"/>

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
          class="btn-floating btn-large blue"
          data-position="top"
          v-tooltip="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
export default {
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if(!Object.keys(this.$store.getters.getUserData).length) {
      await this.$store.dispatch('fetchUserData');
    }
    this.loading = false;
  },
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
    return this.$store.getters.getUserData.locale;

    }
  },
  watch: {
    error(fbError) {
      this.$toaster.error(fbError.code || 'Упссс... Что-то пошло не так');
    }
  }
}
</script>