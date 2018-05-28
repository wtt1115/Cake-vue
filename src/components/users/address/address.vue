<template>
        <div id="site">
            <div class="Stop">
                <ul class="StopUl">
                    <li><i class="fa fa-bars"></i></li>
                    <li><img src="http://static.21cake.com/themes/wap/img/logo.png" /></li>
                    <li><i class="fa fa-shopping-cart"></i></li>
                </ul>
            </div>
            <div class="Smain">
                <div class="kong">
                    <img src="//themes/wap/img/address-empty.png">
                </div>
            </div>
            <div class="Sfoot">
                <button @click="Xsite()">添加新地址</button>
            </div>
        </div>
        
</template>
<script>
    
    import './address.scss'
    import router from '../../../router/router'

    export default{
        components: {
        },
        methods:{
            Xsite(){
                router.push({name:'addsite'});
            }
        }
       
    }
    
</script>