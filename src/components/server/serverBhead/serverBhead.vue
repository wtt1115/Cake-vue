<template>
        <div class="serverBhead">
            <div class="w-logo">
                <img src="http://10.3.133.73:88/cake.png" />
            </div>
            <div class="gongneng1">
                <ul>
                    <li>
                        <i class="fa fa-arrow-circle-left left" @click="scaling1"></i>
                        <i class="fa fa-arrow-circle-right right" @click="scaling2"></i>
                    </li>
                    <li>
                        <i class="fa fa-arrows-alt" @click="scaling3"></i>
                    </li>
                    <li>
                        <i class="fa fa-cog"></i>
                        <span class="wbadge wb3">10</span>
                    </li>
                    <li>
                        <i class="fa fa-envelope-o"></i>
                        <span class="wbadge wb4">4</span>
                    </li>
                </ul>
            </div>
            <div class="gongneng2">
                <ul>
                    <li>
                        <i class="fa fa-cloud-download"></i>
                        <span class="wbadge wb1"> 2</span>
                    </li>
                    <li>
                        <i class="fa fa-bell"></i>
                        <span class="wbadge wb2"> 1</span>
                    </li>
                    <li>
                        <img :src="src" class="touxiang" />
                        <span class="nickname">{{this.txt}}</span>
                    </li>
                    <li>
                        <i class="fa fa-power-off" @click="leave"></i>
                    </li>
                </ul>
            </div>
            
       
            
        </div>
        
</template>
<script>
    import './serverBhead.scss'
    import $ from 'jquery'

    export default{
        data(){
            return{
     
                src:'http://10.3.133.73:88/touxiang.jpg',
                txt:'wtt',
            }
        },
        mounted(){
            $(document).keyup(function(event){
                 switch(event.keyCode) {
                 case 27:
                 $(".w-head").show(400);
                 $(".w-menu").show(400);
                 $(".w-main").animate({left:'230px',top:"58px"},900);
                 
                  }
                });
        },
        methods:{
             scaling1(){
                $(".left").hide(500);
                $(".right").show(500);
                $(".w-menu").hide(400);
                $(".w-main").animate({left:'30px'},300)
             },
             scaling2(){
                $(".left").show(500);
                $(".right").hide(500);
                $(".w-menu").show(400);
                $(".w-main").animate({left:'230px'},300)
             },
             scaling3(){
                $(".w-head").hide(400);
                $(".w-menu").hide(400);
                $(".w-main").animate({left:'30px',top:"30px"},300)
                $(".w-tuichu").show();
                $(".w-tuichu").delay(3000).hide(0);

             },
             leave(){
                if(confirm('确定要离开吗？')){
                     this.$router.push({name:'serverlogin'})
                 }else{
                      console.log('留在原地')
                 }
             }
        }

        
       
    }
</script>