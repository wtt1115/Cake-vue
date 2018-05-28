<template>
        <div class="serverBackground">
            <div class="w-head">
                <hd></hd>
            </div>
            <div class="w-menu">
                <mn></mn>
            </div>
            <div class="w-main">
                <router-view></router-view>
            </div>
       
            
        </div>
        
</template>
<script>
    import './serverBackground.scss'
    import hd from '../serverBhead/serverBhead.vue'
    import mn from '../serverBleft/serverBleft.vue'
   


    export default{
         components:{
            hd,
            mn,
            
        },
       
    }
    
</script>