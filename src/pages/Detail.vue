<template>
  <div>

    <Loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">
          {{ 'Menu_History' | localize }}
        </router-link>
        <a @click.prevent class="breadcrumb">{{ record.typeText }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            :class="[record.typeClass]"
            class="card">
            <div class="card-content white-text">
              <p>{{ 'Description' | localize }}: {{ record.description }}</p>
              <p>{{ 'Amount' | localize }}: {{ record.amount | currency }}</p>
              <p>{{ 'Category' | localize }}: {{ record.categoryName }}</p>

              <small> {{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="page-subtitle">
      <h4 class="center">{{ 'Record_Not_Found' | localize }}</h4>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
import localizeFilter from '@/filters/localize.filter';

export default {
  data: () => ({
    loading: true,
    record: null
  }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.fetchRecordById(id);
    const category = await this.fetchCategoryById(record.categoryId);

    this.record = {
      ...record,
      categoryName: category.title,
      typeClass: record.type === 'income' ? 'green' : 'red',
      typeText: record.type === 'income' ? localizeFilter('Income') : localizeFilter('Expense'),
    }

    this.loading = false;
  },
  methods: {
    ...mapActions([
      'fetchCategoryById', 'fetchRecordById'
    ]),
  },
};
</script>