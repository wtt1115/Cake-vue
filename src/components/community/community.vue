<template>
    <div class="community">
        <div class="w-head">
             <p>社区</p>
            <div class="w-nav">
                <ul>
                    <li class="kezhi">21客志</li>
                    <li>树洞</li>
                </ul>
            </div>
        </div>
       
        <div class="w-main">
            <ul>
                <li v-for="(item,idx) in essay" :key="idx">
                    <p class="w-time">{{item.time}}</p>
                    <img :src="item.img_url"  class="w-img"/>
                </li>
                
            </ul>
        </div>
        <footComponent></footComponent>
    </div>
        
</template>

<script>
    import './community.scss'
    import footComponent from '../foot/foot.vue'

    export default{
        data(){
            return{
                essay:[
                    {
                        time: "8月21日",
                        img_url: "http://10.3.133.73:88/essay2.jpg",
                    },{
                        time: "9月13日",
                        img_url: "http://10.3.133.73:88/essay2.jpg",
                    },{
                        time: "10月18日",
                        img_url: "http://10.3.133.73:88/essay1.jpg",
                    },{
                        time: "11月21日",
                        img_url: "http://10.3.133.73:88/essay2.jpg",
                    },{
                        time: "12月21日",
                        img_url: "http://10.3.133.73:88/essay2.jpg",
                    },{
                        time: "1月30日",
                        img_url: "http://10.3.133.73:88/essay2.jpg",
                    },{
                        time: "3月1日",
                        img_url: "http://10.3.133.73:88/essay2.jpg",
                    },{
                        time: "4月23日",
                        img_url: "http://10.3.133.73:88/essay2.jpg",
                    },
                ]
            }
        },
        components: {
           footComponent
           
        }
    }
    
    
</script>