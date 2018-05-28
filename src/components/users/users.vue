<template>
    <div class="main">
        <div class="header">
            <div class="cont">
                <ul class="ull">
                    <li>
                        <b class="fa fa-user-circle-o"></b>
                    </li>
                    <li>
                        <router-link to="/register"><span class="zhuce">注册</span></router-link>/<span class="dl">登录</span>
                    </li>
                    <li>
                        <router-link to="/login"><i class="fa fa-angle-right t1"></i></router-link>
                    </li>
                </ul>
            </div>
            <div class="you">
                <ul class="hui">
                    <li>
                        <i>1张</i><span>优惠券</span>
                    </li>
                    <li>
                        <i>￥0.00</i><span>余额</span>
                    </li>
                </ul>
            </div>
        </div>
         <div class="t_main">

            <ul class="big">
                <li>
                    <span>我的订单</span><router-link to="/order"> <b  class="fa fa-angle-right"></b></router-link>
                </li>
               <li>
                    <span >地址管理</span><router-link to="/address"><b class="fa fa-angle-right"></b></router-link>
               </li>
                <li>
                    <span >我的优惠券</span><b class="fa fa-angle-right"></b>
                </li>
                <li>
                    <span >果实币充值</span><b  class="fa fa-angle-right"></b>
                </li>
                <li>
                    <span >我的21客会</span><b  class="fa fa-angle-right"></b>
                </li>
            </ul>
        </div>
        <div class="c_main">

            <ul class="box">
                <li><span >用户反馈</span><i class="fa fa-angle-right"></i></li>
                <li><span >版本更新</span><i ><em>2.9.32</em><b class="fa fa-angle-right"></b></i></li>
                <li><span >服务条款</span><i class="fa fa-angle-right"></i></li>
                <li><span >关于我们</span><i class="fa fa-angle-right"></i></li>
            </ul>
        </div>
        <div class="b_main">
            <p>客服电话400 650 2121 <i class="fa fa-tty"></i></p>
            
        </div>
        
       
        <footComponent></footComponent>
    </div>
        
</template>

<script>

    
    import footComponent from '../foot/foot.vue'
    import './users.scss'

    export default{
        components: {
           footComponent
           
        }
    }
    
    
</script>