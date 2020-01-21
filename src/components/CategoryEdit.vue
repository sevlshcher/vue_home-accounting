<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Edit' | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select
            ref="select"
            v-model="current">
            <option
              v-for="cat of categories"
              :key="cat.id"
              :value="cat.id">{{ cat.title }}</option>
          </select>
          <label>{{ 'Select_Categories' | localize }}</label>
        </div>

        <div class="input-field">
          <input
            id="name-edit"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required }" />
          <label for="name-edit">{{ 'Category_Name' | localize }}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid">
            {{ 'Enter_Category_Name' | localize }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit-edit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue }" />
          <label for="limit-edit">{{ 'Category_Limit' | localize }}</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid">
            {{ 'Enter_Category_Limit' | localize }} {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'Update' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100)}
  },
  watch: {
    current(currentId) {
      const { title, limit } = this.categories.find(cat => cat.id === currentId);
      this.title = title;
      this.limit = limit;
    }
  },
  created() {
    const { id, title, limit } = this.categories[this.categories.length - 1];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    this.select = window.M.FormSelect.init(this.$refs.select);
    window.M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();

        return;
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        };
        await this.$store.dispatch('updateCategory', categoryData);

        this.$toaster.success(`Категория ${categoryData.title} успешно обновлена`);
        this.$emit('updated', categoryData);
      } catch (e) {}
    }
  }
}
</script>