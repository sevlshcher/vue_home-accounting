<template>
  <form class="card auth-card" @submit.prevent="handleSubmit">
    <div class="card-content">
      <span class="card-title">{{ 'CRM_Title' | localize }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required || $v.email.$dirty && !$v.email.email)}" />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required">
          {{ 'Message_EmailRequired' | localize }}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email">
          {{ 'Message_EmailValid' | localize }}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required || $v.password.$dirty && !$v.password.minLength)}"/>
        <label for="password">{{ 'Password' | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required">
          {{ 'Message_EnterPassword' | localize }}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength">
          {{ 'Enter_Limit' | localize }} {{ $v.password.$params.minLength.min }} символов</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required }"/>
        <label for="name">{{ 'Name' | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required">
          {{ 'Message_Enter_Name' | localize }}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="checkBox"/>
          <span>{{ 'AcceptRules' | localize }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ 'Register' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ 'HasAccount' | localize }}
        <router-link to="/login">{{ 'Login' | localize }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
  metaInfo() {
    return {
      title: this.$title('Register')
    }
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    checkBox: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(8)},
    name: { required },
    checkBox: { checked: v => v }
  },
  methods: {
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      
      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/login');
        this.$toaster.success("Вы успешно зарегистрированы");
      } catch (e) {}
    }
  }
}
</script>