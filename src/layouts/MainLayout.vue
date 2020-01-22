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
          :key="locale +'1'"
          class="btn-floating btn-large blue"
          data-position="top"
          v-tooltip="tooltip">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import localizeFilter from '@/filters/localize.filter';

export default {
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if(!this.$store.getters.getUserData.bill || !this.$store.getters.getUserData.name) {
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
    },
    tooltip() {
      return `${localizeFilter('Add_Record')}`;
    }
  },
  watch: {
    error(fbError) {
      this.$toaster.error(fbError.code || 'Упссс... Что-то пошло не так');
    }
  }
}
</script>