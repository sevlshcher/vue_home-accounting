<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error;
    } 
  },
  watch: {
    error(fbError) {
      this.$toaster.error(fbError.code || 'Упссс... Что-то пошло не так');
    }
  }
}
</script>