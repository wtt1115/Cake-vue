import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter);

import addsite from '../components/users/address/addsite/addsite.vue'

import users from '../components/users/users.vue'
import index from '../components/index/index.vue'
import classfiy from '../components/classfiy/classfiy.vue'
import car from '../components/car/car.vue'
import order from '../components/order/order.vue'
import community from '../components/community/community.vue'

import details from '../components/details/details.vue';
import search from '../components/search/search.vue';
import list from '../components/list/list.vue';

import register from '../components/users/register/register.vue'
import login from '../components/users/login/login.vue'
import address from '../components/users/address/address.vue'


import account from '../components/users/account/account.vue'
import xinxi from '../components/users/account/xinxi/xinxi.vue'
// 后端
import serverlogin from '../components/server/serverlogin/serverlogin.vue'
import serverBackground from '../components/server/serverBackground/serverBackground.vue'
import serverUser from '../components/server/serverUser/serverUser.vue'
import serverProduct from '../components/server/serverProduct/serverProduct.vue'




const router = new VueRouter({
    routes: [
        {path: '/users', component: users, name: 'users'},
        {path: '/register', component: register, name: 'register'},
        {path: '/login', component: login, name: 'login'},
        {path: '/address', component: address, name: 'address'},
         {path: '/account', component: account, name: 'account'},

        {path:'/xinxi',component:xinxi, name:'xinxi'},
        {path:'/addsite',component:addsite, name:'addsite'},
        {path: '/order', component: order, name: 'order'},
        {path: '/', component: index, name: 'index'},
        {path: '/classfiy', component: classfiy, name: 'classfiy'},
        {path: '/car', component: car, name: 'car'},
        {path: '/community', component: community, name: 'community'},
         
        {path: '/order', component: order, name: 'order'},
        {path:'/details',component:details,name:'details'},
        {path:'/search',component:search,name:'search'},
        {path:'/list',component:list,name:'list'},


        // 服务端路由
        {path:'/serverlogin',component:serverlogin,name:'serverlogin'},
        {path:'/serverBackground',component:serverBackground,name:'serverBackground',children:[
         {path:'serverUser',component:serverUser,name:'serverUser'},
         {path:'serverProduct',component:serverProduct,name:'serverProduct'},
                ]},
        
    ]
})

export default router;