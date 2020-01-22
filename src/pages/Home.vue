<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_Bill' | localize }}</h3>

      <button
        @click="refresh"
        class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loadding"/>
    <div v-else class="row">
      <HomeBill
        :rates="currency.rates"/>
      <HomeCurrency
        :rates="currency.rates"
        :date="currency.date"/>
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill';
import HomeCurrency from '@/components/HomeCurrency';

export default {
  metaInfo() {
    return {
      title: this.$title('Menu_Bill')
    }
  },
  data: () => ({
    loadding: true,
    currency: null
  }),

  components: {
    HomeBill,
    HomeCurrency
  },

  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loadding = false;
  },

  methods: {
    async refresh() {
      this.loadding = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loadding = false;
    }
  }
};
</script>

<style>
</style>