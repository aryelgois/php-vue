import Vue from 'vue';
import VueResource from 'vue-resource';
import Hello from './components/Hello.vue';

Vue.use(VueResource);

Vue.component('hello', Hello);

var app = new Vue({
  el: '#app',
  render: h => h(Hello)
});
