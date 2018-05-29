<template>
        <div class="zhuce">
      
            <div class="nav">
                <div class="nvt">
                    <router-link to="/">
                    <i class="fa fa-angle-left " ></i>
                    </router-link>
                    <span>用户注册</span>
                    <router-link to="/login">
                    <i class="fa fa-angle-right " ></i>
                    </router-link>
                </div>
            </div>
            <div class="yzm">
                <ul class="form">
                    <li> 
                        <input type="text" placeholder="手机号码" v-model="data.username"/>
                    </li>
                    <li> 
                        <input type="text" placeholder="密码:8~20字符，需同时包含英文和数字"v-model="data.password"/>
                    </li>
                     <li> 
                        <input type="text" placeholder="确认密码"v-model="pwd"/>
                    </li>
                    <li>
                        <input type="text" placeholder="请输入图片字符" id="code_input"/>
                        <h1 id="v_container" class="codes"></h1> 
                    </li>
                    <li>
                        <input type="text" placeholder="请选择生日" id="date" v-show="showl"/>
                    </li>
                     <li> 
                       <span  v-text="errot" v-show="show" calss="fa fa-info-circle"></span>
                    </li>
                    
                    <li>
                    <router-link to="/login"><button id="btn">注&nbsp;册</button></router-link> 
                    </li>
                </ul>
                <p class="xieyi">使用未注册的手机号码登录时，将自动注册21cake账号，且认为您已同意<i class="tip">《21cake用户协议》</i></p>
            </div>
        </div>
</template>
<script>
import './register.scss'
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
                errot:'',
                pwd:'',
                showl:false  
            }  
        },
        mounted(){
               this.showl = true;
              $("#date").dateSelect();
               console.log($("#date")) 
             
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
                if(this.pwd !== this.data.password){
                    this.show = true;
                    this.errot = '请输入相同的密码！';
                    return false;
                }

                 http.post('register',this.data).then((res)=>{
                        console.log(res)
                   
                })

                
              }
               
        },

        // methods:{s

            
        //     code(event){
            
        //         console.log(event.target)

        //     }
        // } 

    }
    
</script>