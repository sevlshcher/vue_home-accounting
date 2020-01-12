<template>
  <div>

    <Loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">
          История
        </router-link>
        <a @click.prevent class="breadcrumb">{{ record.typeText }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            :class="[record.typeClass]"
            class="card">
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount | currency }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small> {{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="page-subtitle">
      <h4 class="center">Запись не найдена</h4>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
      typeText: record.type === 'income' ? 'Доход' : 'Расход',
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