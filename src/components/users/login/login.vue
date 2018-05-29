<template>
        <div class="dl">
             <div class="nav">
                <div class="nvt">
                    <router-link to="/register">
                    <i class="fa fa-angle-left " ></i>
                    </router-link>
                    <span>用户登录</span>
                    <router-link to="/">
                    <i class="fa fa-angle-right " ></i>
                    </router-link>
                </div>
            </div>
            <div class="yzm">
                <ul class="form">
                    <li> 
                        <input type="text" placeholder="手机号码"v-model="data.username">
                    </li>
                    <li> 
                        <input type="text" placeholder="密码" v-model="data.password">
                    </li>
                    <li>
                         <input type="text" placeholder="图形验证码" id="code_input"/>
                        <h1 id="v_container" class="codes"></h1> 
                    </li>
                    <li> 
                       <span  v-text="errot" v-show="show" calss="fa fa-info-circle"></span>
                    </li>
                    
                    <li >
                        <router-link to="/users"><span id="btn">登录</span></router-link> 
                    </li>
                </ul>
                <p class="xieyi">使用未注册的手机号码登录时，将自动注册21cake账号，且认为您已同意<i class="tip">《21cake用户协议》</i></p>
                
            </div>
        </div> 
</template>
<script>
import './login.scss'
import '../../libs/date/gVerify.js'
import '../../libs/yzm/jquery-2.1.1.min.js'
import  '../../libs/yzm/dateSelect.js'
import http from '../../../utils/httpclient.js'
import router from '../../../router/router.js'
    export default{
        data(){
            return {
                data:{
                     username:'',
                    password:''
                },
                show:false,
                errot:''
            }
        },
        mounted(){
            var verifyCode = new GVerify("v_container");
              document.getElementById('btn').onclick=()=>{
                console.log(document.getElementById("code_input").value)
                var rest = verifyCode.validate(document.getElementById("code_input").value);
                let reg = /^1[34578]\d{9}$/;
                if(!reg.test(this.data.username)){
                    this.show = true;
                    this.errot = '请输入正确手机号码';
                    return false;
                } 

                let mima =/^\S{8,20}$/;
                if(!mima.test(this.data.password)){
                    this.show = true;
                    this.errot = '密码:8~20字符，需同时包含英文和数字！';
                    return false;
                }

                http.post('login',this.data).then((res) =>{
                    console.log(res)
                    if(res.status){
                         window.localStorage.setItem('token',res.data.token);
                        window.localStorage.setItem('username',res.data.username);
                        // router.push({name:'users'});
                    } else {
                        this.show = true
                        this.errot = '手机号或密码错误！'
                    } 
                })
            }
        }
    }
    
</script>