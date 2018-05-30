<template>
  <div class="box">
    <div class="head">
      <ul class="box1">
        <li> 
          <router-link to="/users"> 
            <i class="fa fa-angle-left " ></i>
          </router-link>
        </li>
        <li>我的账户</li>
        <li></li>
      </ul>
    </div>
    <div class="box2">
      <ul class="big" >
        <li> 
          <router-link to="/order"> 
            <span>
              我的信息
            </span>
              <b  class="fa fa-angle-right"></b>
          </router-link>
        </li>
        <li>
          <router-link to="/address">
            <span>
              绑定手机
              <i v-show="shoe" class="call">{{username}}</i>
            </span>
              <b class="fa fa-angle-right"></b>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <span>
              修改密码
            </span>
              <b class="fa fa-angle-right"></b>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="b_main">
      <p class="tui"  @click="tuc" v-show="show">退出登录</p>
    </div>
</div>  
</template>
<script>
import './account.scss'
  import http from '../../../utils/httpclient.js'
import router from '../../../router/router.js'
    export default{
         data(){
            return {
              show:true,
              username:'',
              shoe:false
            }
          },
          mounted(){
            let username = window.localStorage.getItem('username');
            http.post('getStatus',{}).then((res) =>{
                if(res.status && username){
                    console.log(res)
                     this.username = username;
                    
                    this.shoe = true;
                } 
            })

          },
          methods:{
            tuc(){
                 let username = window.localStorage.removeItem('username');
                // window.localStorage.removeItem('token');
                console.log(username) 
                 this.show = false;
               router.push({name:'users'});
            }
         }
    }
    
</script>