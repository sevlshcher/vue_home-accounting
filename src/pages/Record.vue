<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_New_Record' | localize }}</h3>
    </div>

    <Loader v-if="loading" />

    <div v-else-if="!categories.length" class="page-subtitle">
      <h4 class="center">{{ 'No_Categories' | localize }}. <router-link to="/categories">{{ 'Add_Category' | localize }}</router-link></h4>
    </div>

    <form
      v-else
      @submit.prevent="submitHandler"
      class="form">
      <div class="input-field">
        <select
          ref="select"
          v-model="category">
          <option
            v-for="cat of categories"
            :key="cat.id"
            :value="cat.id">{{ cat.title }}</option>
        </select>
        <label>{{ 'Select_Categories' | localize }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type" />
          <span>{{ 'Income' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type" />
          <span>{{ 'Expense' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: ($v.amount.$dirty && !$v.amount.minValue || $v.amount.$dirty && !$v.amount.required) }" />
        <label for="amount">{{ 'Amount' | localize }}</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid">
          {{ 'Enter_Limit' | localize }} {{ $v.amount.$params.minValue.min }}
        </span>
        <span
          v-if="$v.amount.$dirty && !$v.amount.required"
          class="helper-text invalid">
          {{ 'Enter_Amount' | localize }}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required }" />
        <label for="description">{{ 'Description' | localize }}</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid">
          {{ 'Enter_Description' | localize }}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Create' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  metaInfo() {
    return {
      title: this.$title('Menu_New_Record')
    }
  },
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: { minValue: minValue(1), required },
    description: { required }
  },
  async mounted() {
    this.categories = await this.fetchCategories();
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0];
    };

    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields();
    }, 0);
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  computed: {
    ...mapGetters(['getUserData']),
    canCreateRecord() {
      if (this.type === 'income') {

        return true;
      }

      return this.getUserData.bill >= this.amount;
    }
  },
  methods: {
    ...mapActions([
      'fetchCategories', 'createRecord', 'updateUserData'
    ]),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();

        return;
      }

      if (this.canCreateRecord) {
        const payload = {
          categoryId: this.category,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON()
        };

        try {
          await this.createRecord(payload);
          const bill = this.type === 'income'
            ? this.getUserData.bill + this.amount
            : this.getUserData.bill - this.amount;

          await this.updateUserData({ bill });
          this.$toaster.success('Запись успешно создана');
          this.$v.$reset();
          this.amount = 1;
          this.description = '';
        } catch (e) {}
      } else {
        this.$toaster.error(`Недостаточно суммы на счёте (${this.amount - this.getUserData.bill})`);
      }
    }
  },
};
</script>