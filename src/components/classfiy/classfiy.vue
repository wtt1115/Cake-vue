<template>
    <div id="classfiy">
        <div class="k-header">
            <ul class="Htop">
                <li><i class="fa fa-bars"></i></li>
                <li><img src="http://static.21cake.com/themes/wap/img/logo.png" /></li>
                <li><i class="fa fa-shopping-cart"></i></li>
            </ul>
        </div>
        <div class="k-nav">
            <ul>
                <li @click="cut('cake')">蛋糕</li>
                <li @click="cut('Ice')">冰淇淋</li>
                <li>小切块</li>
                <li>咖啡</li>
                <li>常温蛋糕</li>
                <li>设计师礼品</li>
            </ul>
        </div>
        <div class="k-main">
            <div class="k-Tmain">
                <ul>
                    <li v-for="(item,idx) in data">
                        <img :src="item.img_url">
                        <p>{{item.en_name}}</p>
                        <p>{{item.name}}</p>
                        <span>￥{{item.price}}/{{item.spec[0]}}</span>
                        <i class="fa fa-cart-plus"></i>
                    </li>
                </ul>
            </div>
            <div class="k-Bmain">
                <div class="title">
                    <p>季节性下线</p>
                    <span>在合适的季节，吃恰当的食物</span>
                </div>
                <div class="look">
                    <ul>
                        <li>
                            <img src="//static.21cake.com//goods/145933696681.jpg" />
                            <p>The Moon Cake</p>
                            <p>中秋坚果芝士慕斯</p>
                            <span>￥268.00/1.0磅</span>
                            <div class="mask"></div>
                            <h2>敬请期待</h2>
                        </li>
                        <li>
                            <img src="//static.21cake.com//goods/14770358359650.jpg" />
                            <p>Birthday Cake</p>
                            <p>21cake生日奶油蛋糕</p>
                            <span>￥498.00/0.5磅</span>
                            <div class="mask"></div>
                            <h2>敬请期待</h2>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <footComponent></footComponent>
    </div>
        
</template>

<script>
    
    import footComponent from '../foot/foot.vue'
    import './classfiy.scss'

    export default{
        data(){
            return {
                data:[]
            }
        },
        components: {
           footComponent
        },
        methods:{
            cut(type){
            
                console.log(type)
            }
        }
    }
    
    
</script>