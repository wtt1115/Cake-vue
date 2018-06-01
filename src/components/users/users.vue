<template>
    <div class="main">
        <div class="header">
            <div class="cont">
                <ul class="ull">
                    <li>
                        <b class="fa fa-user-circle"></b>
                    </li>
                    <li>
                    <span v-show="show"> 
                        <router-link to="/register">
                            <span class="zhuce">注册</span></router-link>
                            <router-link to="/login">
                        <span class="dl">登录</span>  
                    </router-link>
                        </span>
                       <span v-show="showname">{{username}}</span>
                    </li>
                    <li>
                        <router-link to="/account">
                            <i class="fa fa-angle-right t1"></i>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="you">
                <ul class="hui">
                    <li>
                        <span>1张</span><span>优惠券</span>
                    </li>
                    <li>
                        <i>￥0.00</i><span>余额</span>
                    </li>
                </ul>
            </div>
        </div>
         <div class="t_main">
            <ul class="big" >
                <li> 
                <router-link to="/myorder"> 
                   <span>
                        <i class="fa fa-check-square"></i>我的订单
                    </span>
                   
                        <b  class="fa fa-angle-right">
                        </b>
                    </router-link>
                </li>
               <li @click="dizhi">
             
                    <span>
                        <i class="fa fa-truck"></i>地址管理
                    </span>
                   
                        <b class="fa fa-angle-right"></b>
              
               </li>
                <li>
                    <span>
                        <i class="fa fa-calendar-minus-o"></i>我的优惠券
                    </span>
                    <b class="fa fa-angle-right"></b>
                </li>
                <li>
                    <span>
                        <i class="fa fa-money"></i>果实币充值
                    </span>
                    <b  class="fa fa-angle-right"></b>
                </li>
                <li>
                    <span>
                        <i class="fa fa-car"></i>我的21客会
                    </span>
                    <b  class="fa fa-angle-right"></b>
                </li>
            </ul>
        </div>
        <div class="c_main">
            <ul class="box" >
                <li>
                    <span >用户反馈</span><i class="fa fa-angle-right"></i>
                </li>
                <li>
                    <span >版本更新</span><i ><em>2.9.32</em><b class="fa fa-angle-right"></b></i>
                </li>
                <li>
                    <span >服务条款</span><i class="fa fa-angle-right"></i>
                </li>
                <li>
                    <span >关于我们</span><i class="fa fa-angle-right"></i>
                </li>
            </ul>
        </div>
        <div class="b_main">
            <p>客服电话400 650 2121 <i class="fa fa-tty"></i></p>
        <!--  <p class="tui"  @click="tuc" v-show="showname">退出账号</p> -->
        </div>
        <footComponent></footComponent>
    </div>
</template>
<script>
    import footComponent from '../foot/foot.vue'
    import './users.scss'
    import http from '../../utils/httpclient.js'
import router from '../../router/router.js'
    export default{
        data(){
            return{
                show:true,
                showname:false,
                username:''
            }
        },
        components: {
           footComponent
        },
        methods:{
            dizhi(){
                this.$router.push({name:'address',query:{type:'users'}})
            }
        },
        mounted(){
         
            http.post('getStatus',{}).then((res) =>{
                if(res.status ){
                    let username = window.localStorage.getItem('username');
                    console.log(res)
                    this.username = username;
                    this.show = false;
                    this.showname = true;
                } 
            })
        },

    }
</script>