<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <div v-else-if="!records.length" class="page-subtitle">
      <h4 class="center">Записей пока нет. <router-link to="/record">Добавить новую запись</router-link></h4>
    </div>

    <section v-else>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    HistoryTable
  },
  data: () => ({
    loading: true,
    categories: [],
    records: []
  }),
  async mounted() {
    const records = await this.fetchRecords();

    this.categories = await this.fetchCategories();
    this.records = records.map(rec => {

      return {
        ...rec,
        categoryName: this.categories.find(cat => cat.id === rec.categoryId).title,
        typeClass: rec.type === 'income' ? 'green' : 'red',
        typeText: rec.type === 'income' ? 'Доход' : 'Расход',
      }
    });

    this.loading = false;
  },
  methods: {
    ...mapActions([
      'fetchCategories', 'fetchRecords'
    ]),
  },
};
</script>