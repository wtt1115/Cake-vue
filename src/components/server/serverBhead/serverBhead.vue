<template>
        <div class="serverBhead">
            <div class="w-logo">
                <img src="http://static.21cake.com//themes/site/img/logo.png" />
            </div>
            <div class="gongneng1">
                <ul>
                    <li>
                        <i class="fa fa-arrow-circle-left left" @click="scaling1"></i>
                        <i class="fa fa-arrow-circle-right right" @click="scaling2"></i>
                    </li>
                    <li><i class="fa fa-arrows-alt"></i></li>
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
     
                src:'http://img2.woyaogexing.com/2018/05/25/ea6ee9435f32b367!400x400_big.jpg',
                txt:'wtt',
            }
        },
        methods:{
             scaling1(){
                $(".left").hide(700);
                $(".right").show(700);
                $(".menu").hide(700);
                $(".main").animate({left:'10px'},800)
             },
             scaling2(){
                $(".left").show(700);
                $(".right").hide(700);
                $(".menu").show(700);
                $(".main").animate({left:'270px'},800)
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