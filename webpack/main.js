import Vue from 'vue';
import Hello from './components/Hello.vue';

Vue.component('hello', Hello);

var app = new Vue({
  el: '#app',
  render: h => h(Hello)
});
