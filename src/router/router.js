import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);

import users from '../components/users/users.vue'
import index from '../components/index/index.vue'
import classfiy from '../components/classfiy/classfiy.vue'
import car from '../components/car/car.vue'
import community from '../components/community/community.vue'



const router = new VueRouter({
    routes: [
        {path: '/users', component: users, name: 'users'},
        {path: '/', component: index, name: 'index'},
        {path: '/classfiy', component: classfiy, name: 'classfiy'},
        {path: '/car', component: car, name: 'car'},
        {path: '/community', component: community, name: 'community'},

        // 服务端路由
        // {path:'/serverlogin',component:serverlogin,name:'serverlogin'},
        
    ]
})

export default router;