import Vue from 'vue';

import store from './store/store'
import router from './router/router'

import appComponent from './components/app/app.vue'
import $ from 'jquery'



new Vue({
    el: '#app',
    router,
    store,
    render: h => h(appComponent)
})  