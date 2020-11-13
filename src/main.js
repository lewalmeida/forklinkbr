import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import i18n from './i18n';

const firebaseConfig = {
  apiKey: 'AIzaSyBxWaKyvhLVz_ZRv8wFVTozY0TbxEA5Ohc',
  authDomain: 'forklinkbr.firebaseapp.com',
  databaseURL: 'https://forklinkbr.firebaseio.com',
  projectId: 'forklinkbr',
  storageBucket: 'forklinkbr.appspot.com',
  messagingSenderId: '432465358836',
  appId: '1:432465358836:web:ff2ff7d17d3d71181913a1',
};

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
