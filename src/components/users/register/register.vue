<template>
        <div class="zhuce">
            <div class="nav">
                <div class="nvt">
                    <router-link to="/users">
                    <i class="fa fa-angle-left " ></i>
                    </router-link>
                    <span>用户注册</span>
                    <router-link to="/login">
                        登录
                    </router-link>
                </div>
            </div>
            <div class="yzm">
                <ul class="form">
                    <li> 
                        <input type="text" placeholder="手机号码" v-model="data.username"/>
                    </li>
                    <li> 
                        <input type="password" placeholder="密码:8~20字符，需同时包含英文和数字"v-model="data.password"/>
                    </li>
                     <li> 
                        <input type="password" placeholder="确认密码"v-model="pwd"/>
                    </li>
                    <li>
                        <input type="text" placeholder="请输入图片字符" id="code_input" v-model="yzm"/>
                        <h1 id="v_container" class="codes"></h1>
                    </li>
                    <li>
                        <input type="text" placeholder="请选择生日" id="demo1" />
                    </li>
                     <li> 
                       <span  v-text="errot" v-show="show" calss="fa fa-info-circle"></span>
                    </li>
                    <li>
                  <button id="btn" >注&nbsp;册</button>
                    </li>
                </ul>
                <p class="xieyi">使用未注册的手机号码登录时，将自动注册21cake账号，且认为您已同意<i class="tip">《21cake用户协议》</i></p>
            </div>
        </div>
</template>
<script>
import './register.scss'
import '../../libs/date/gVerify.js'
import '../../libs/date/datePicker.js'
import http from '../../../utils/httpclient.js'
import router from '../../../router/router.js'
    export default{
        data(){
            return {
                data:{
                    username:'',
                    password:''
                },
                show:true,
                errot:'',
                pwd:'',
                showl:false,
                yzm:'' 
          
                }  
        },
        mounted(){
            var calendar = new datePicker();
            calendar.init({
                'trigger': '#demo1', /*按钮选择器，用于触发弹出插件*/
                'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
                'minDate':'1900-1-1',/*最小日期*/
                'maxDate':'2100-12-31',/*最大日期*/
                'onSubmit':function(){/*确认时触发事件*/
                    var theSelectData=calendar.value;
                },
                'onClose':function(){/*取消时触发事件*/
                }
            });

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
                        if(res.status){
                           router.push({name:'login'});
                      
                        } else {
                            this.show=true;
                            this.errot = '注册失败';
                            return false;
                        }
                })

              }
        }
    }
    
</script>