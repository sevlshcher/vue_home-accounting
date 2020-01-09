import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Toaster from 'v-toaster';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import Loader from '@/components/app/Loader';
import './registerServiceWorker';
import 'v-toaster/dist/v-toaster.css';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(Toaster, { timeout: 5000 });

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);

Vue.component('Loader', Loader);

firebase.initializeApp({
  apiKey: "AIzaSyDwqlh5xl28wGEPdcrvei2T4bZ8MPneM_k",
  authDomain: "vue-crm-d43b2.firebaseapp.com",
  databaseURL: "https://vue-crm-d43b2.firebaseio.com",
  projectId: "vue-crm-d43b2",
  storageBucket: "vue-crm-d43b2.appspot.com",
  messagingSenderId: "724914531914",
  appId: "1:724914531914:web:9da5a927bfe70e330dc0b3",
  measurementId: "G-GJZEBSFN97"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')}
})
