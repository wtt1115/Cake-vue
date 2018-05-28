<template>
    <div id="classfiy">
        <div class="k-header">
            <ul class="Htop">
                <li @click="zhezao()"><i class="fa fa-bars"></i></li>
                <li><img src="http://static.21cake.com/themes/wap/img/logo.png" /></li>
                <li><i class="fa fa-shopping-cart"></i></li>
            </ul>
        </div>
        <div class="zhezao">
            <h1>筛选</h1>
            <ul>
                <li>蛋糕</li>
                <li>冰淇淋</li>
                <li>小切块</li>
                <li>咖啡</li>
                <li>常温蛋糕</li>
                <li>设计师礼品</li>
            </ul>
            <button @click="fanhui()">返回</button>
        </div>
        <div class="k-nav">
            <ul class="Nav" @click="GaoLiang()">
                <li @click="cut('cake')" class="k-active">蛋糕</li>
                <li @click="cut('Ice')">冰淇淋</li>
                <li @click="cut('Dice')">小切块</li>
                <li @click="cut('Coffee')">咖啡</li>
                <li @click="cut('Ccake')">常温蛋糕</li>
                <li @click="cut('Gift')">设计师礼品</li>
            </ul>
        </div>
        <div class="k-main">
            <div class="k-Tmain">
                <ul class="Main">
                    <li v-for="(item,idx) in data">
                        <img :src="item.img_url">
                        <p> {{item.en_name}}</p>
                        <p>{{item.name}}</p>
                        <span>￥{{item.price[0]}}/{{item.spec[0]}}</span>
                        <i class="fa fa-cart-plus"></i>
                    </li>
                </ul>
            </div>
            <div class="k-Bmain"  v-show="show">
                <div class="title">
                    <p>季节性下线</p>
                    <span>在合适的季节，吃恰当的食物</span>
                </div>
                <div class="look">
                    <ul class="Look">
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
    import http from '../../utils/httpclient.js'

    export default{
        data(){
            return {
                data:[],
                Cake:[],
                Ice:[],
                Dice:[],
                Coffee:[],
                Ccake:[],
                Gift:[],
                show:'true'
            }
        },
        components: {
           footComponent
        },
        methods:{
            cut(type){
                console
                if(type == 'cake'){

                    this.data = this.Cake;
                    this.show = true

                } else if(type == 'Ice'){

                    this.data = this.Ice;
                    this.show = false

                } else if(type == 'Dice'){

                    this.data = this.Dice;
                    this.show = false

                } else if(type == 'Coffee'){

                    this.data = this.Coffee;
                    this.show = false

                } else if(type == 'Ccake'){

                    this.data = this.Ccake;
                    this.show = false

                } else if(type == 'Gift'){

                    this.data = this.Gift;
                    this.show = false
                }
            },
            zhezao(){
                $('.zhezao').css("width","300px")
            },
            fanhui(){
                $('.zhezao').css("width","0")
            }   
        },
        mounted(){
            http.post('getProduct',{}).then((res) =>{

                console.log(res);
                if(res.status){
                    for(var i=0;i<res.data.length;i++){
                        if(res.data[i].type == '蛋糕'){
                            this.data.push(res.data[i]);
                            this.Cake.push(res.data[i]);

                        } else if(res.data[i].type == '冰淇淋'){
                            this.Ice.push(res.data[i]);

                        } else if(res.data[i].type == '小切块'){
                            this.Dice.push(res.data[i]);

                        } else if(res.data[i].type == '咖啡'){
                            this.Coffee.push(res.data[i]);

                        } else if(res.data[i].type == '常温蛋糕'){
                            this.Ccake.push(res.data[i]);
                        } else if(res.data[i].type == '设计师作品'){
                            this.Gift.push(res.data[i]);
                        }
                    }
                }
            })
        }
    }

</script>