import axios from 'axios';
import Vue from 'vue';
axios.defaults.baseURL = 'http://106.15.183.147:8989/';
Vue.prototype.$http = axios;
