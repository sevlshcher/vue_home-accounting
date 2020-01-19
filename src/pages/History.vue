<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <div v-else-if="!records.length" class="page-subtitle">
      <h4 class="center">Записей пока нет. <router-link to="/record">Добавить новую запись</router-link></h4>
    </div>

    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :pageCount="pageCount"
        :clickHandler="pageChangeHandler"
        :prevText="'Prev'"
        :nextText="'Next'"
        :containerClass="'pagination'"
        :pageClass="'waves-effect'"/>
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin';
import HistoryTable from '@/components/HistoryTable';
import { mapGetters, mapActions } from 'vuex';
import { Pie } from 'vue-chartjs';

export default {
  components: {
    HistoryTable
  },
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    const categories = await this.fetchCategories();

    this.records = await this.fetchRecords();
    this.setup(categories);
    this.loading = false;
  },
  methods: {
    ...mapActions([
      'fetchCategories', 'fetchRecords'
    ]),
    setup(categories) {
      this.setupPagination(this.records.map(rec => {
        return {
          ...rec,
          categoryName: categories.find(cat => cat.id === rec.categoryId).title,
          typeClass: rec.type === 'income' ? 'green' : 'red',
          typeText: rec.type === 'income' ? 'Доход' : 'Расход',
        }
      }));

      this.renderChart({
        labels: categories.map(cat => cat.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: categories.map(cat => {
            return this.records.reduce(( total, rec ) => {
              if (rec.categoryId === cat.id && rec.type === 'outcome') {
                total += +rec.amount;
              }

              return total;
            }, 0);
          }),
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })
    }
  },
};
</script>