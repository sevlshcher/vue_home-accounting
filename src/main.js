import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueMeta from 'vue-meta';
import Toaster from 'v-toaster';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter';
import tooltipDirective from '@/directives/tooltip.directive';
import titlePlugin from '@/utils/title.plugin';
import Loader from '@/components/app/Loader';
import Paginate from 'vuejs-paginate';
import './registerServiceWorker';
import 'v-toaster/dist/v-toaster.css';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(titlePlugin);
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
});
Vue.use(Toaster, { timeout: 5000 });

Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltipDirective);

Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

firebase.initializeApp({
  apiKey: `${process.env.VUE_APP_API_KEY}`,
  authDomain: `${process.env.VUE_APP_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.VUE_APP_PROJECT_ID}.firebaseio.com`,
  projectId: `${process.env.VUE_APP_PROJECT_ID}`,
  storageBucket: `${process.env.VUE_APP_PROJECT_ID}.appspot.com`,
  messagingSenderId: `${process.env.VUE_APP_SENDER_I}`,
  appId: `1:${process.env.VUE_APP_SENDER_I}:web:9da5a927bfe70e330dc0b3`,
  measurementId: `${process.env.VUE_APP_MEASURMENT_ID}`
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
