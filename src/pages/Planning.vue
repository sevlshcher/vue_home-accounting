<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_Planning' | localize }}</h3>
      <h4>{{ getUserData.bill | currency('RUB') }}</h4>
    </div>

    <Loader v-if="loading" />

    <div v-else-if="!categories.length" class="page-subtitle">
      <h4 class="center">{{ 'No_Categories' | localize }}. <router-link to="/categories">{{ 'Add_Category' | localize }}</router-link></h4>
    </div>

    <section v-else>
      <div
        v-for="cat of categories"
        :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.spend | currency }} {{ 'Out_Of' | localize }} {{ cat.limit | currency }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter';

export default {
  metaInfo() {
    return {
      title: this.$title('Menu_Planning')
    }
  },
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['getUserData'])
  },
  async mounted() {
    const records = await this.fetchRecords();
    const categoires = await this.fetchCategories();

    this.categories = categoires.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += record.amount;
        }, 0);

      const percent = 100 * spend / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

      const tooltipValue = cat.limit - spend;
      const tooltip = `${tooltipValue < 0
        ? localizeFilter('Excess_On')
        : localizeFilter('Left')} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...cat,
        spend,
        progressPercent,
        progressColor,
        tooltip
      };

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