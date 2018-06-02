<template>
        <div class="serverBackground">
            <div class="w-head">
                <hd></hd>
            </div>
            <div class="w-menu">
                <mn></mn>
            </div>
            <div class="w-main">
                <img src="http://192.168.0.110:88/server_img.jpg" id="server_img" />
                <router-view></router-view>
            </div>
       
            
        </div>
        
</template>
<script>
    import './serverBackground.scss'
    import hd from '../serverBhead/serverBhead.vue'
    import mn from '../serverBleft/serverBleft.vue'
    import $ from 'jquery'
    
   


    export default{
         components:{
            hd,
            mn,            
        },
        mounted(){
            $('#server_img').delay(1000).hide(0)
        }
       
    }
    
</script>