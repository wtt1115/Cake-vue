<template>
        <div class="zhuce">
            <div class="nav">
            <router-link to="/users"><i class="fa fa-angle-left " ></i></router-link><p>用户注册</p>
            </div>
            <div class="yzm">
                <ul class="form">
                    <li> 
                        <input type="text" placeholder="手机号码" v-model="datel.username"/>
                    </li>
                    <li> 
                        <input type="text" placeholder="密码:8~20字符，需同时包含英文和数字"v-model="datel.password"/>
                    </li>
                     <li> 
                        <input type="text" placeholder="确认密码"v-model="pwd"/>
                    </li>
                    <li>
                        <input type="text" placeholder="请输入图片字符" id="code_input"/>
                        <h1 id="v_container" class="codes"v-text="this.code" @click="doe($event)"></h1> 
                    </li>
                    <li>
                        <input type="text" placeholder="请选择生日" id="date" v-show="showl"/>
                    </li>
                     <li> 
                       <span  v-text="errot" v-show="show" calss="fa fa-info-circle"></span>
                    </li>
                    
                    <li id="btn" @click="btn">
                        注册
                    </li>
                </ul>
                <p class="xieyi">使用未注册的手机号码登录时，将自动注册21cake账号，且认为您已同意<i class="tip">《21cake用户协议》</i></p>
                
            </div>
        </div>
        
</template>
<script>

import './register.scss'

import './gVerify.js'

import  './dateSelect.js'


    export default{

        data(){

            return {
                datel:{
                    username:'',
                    password:''
                },
                show:false,
                errot:'',
                pwd:'',
                code:'',
                showl:false  
            }  
        },
        mounted(){
            // console.log(2222)
                this.showl = true;
              $("#date").dateSelect();
             console.log($("#date"))
              var verifyCode = new GVerify("v_container");
              document.getElementById('btn').onclick=()=>{
                var res = verifyCode.validate(document.getElementById("code_input").value);
                console.log(res)
              }

                
        },

        methods:{

            btn(){
             
                let reg = /^1[34578]\d{9}$/;
                if(!reg.test(this.datel.username)){
                    this.show = true
                    this.errot = '请输入正确手机号码'
                    return false;
                } 

                let mima =/^\S{8,20}$/;
                if(!mima.test(this.datel.password)){
                    this.show = true
                    this.errot = '密码:8~20字符，需同时包含英文和数字！'
                    return false;
                }
                if(this.pwd !== this.datel.password){
                    this.show = true;
                    this.errot = '请输入相同的密码！'
                    return false;
                }

                // http.post('register',this.data).then.((res)=>{
                //     if(res.status){
                //         router.pust({
                //             name:'login'
                //         });
                //     }else{
                //         this.show = true
                //         this.errot = "手机号已被注册！"
                //     }
                // })
                
            },
            doe(event){
                // var rt = this.code.e.target.value;
                console.log(event.target.value)

            }
        } 

    }
    
</script>