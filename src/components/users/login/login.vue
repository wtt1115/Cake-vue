<template>
        <div class="dl">
            <div class="nav">
            <router-link to="/users"><i class="fa fa-angle-left " ></i></router-link><p>验证码登录</p>
            </div>
            <div class="yzm">
                <ul class="form">
                    <li> 
                        <input type="text" placeholder="手机号码"/>
                    </li>
                    <li> 
                        <input type="text" placeholder="密码"/>
                    </li>
                    <li>
                        <input type="text" placeholder="图形验证码"/>
                    </li>
                    <li class="btn">验证并登录
                    </li>
                </ul>
                <p class="xieyi">使用未注册的手机号码登录时，将自动注册21cake账号，且认为您已同意<i class="tip">《21cake用户协议》</i></p>
                
            </div>
            
       
            <!-- <footComponent></footComponent> -->
        </div>
        
</template>
<script>
      // import footComponent from '../../foot/foot.vue'
import './login.scss'

    export default{
        components: {
           // footComponent
           
        }
       
    }
    
</script>