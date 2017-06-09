import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';

import VuexStore from './store';

Vue.use(Vuex);

const store = new Vuex.Store(VuexStore);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
