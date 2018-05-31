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
            <ul class="Nav">
                <li @click="cut('cake')" :class="{'k-active':Class.indexOf('cake') > -1}">蛋糕</li>
                <li @click="cut('Ice')" :class="{'k-active':Class.indexOf('Ice') > -1}">冰淇淋</li>
                <li @click="cut('Dice')" :class="{'k-active':Class.indexOf('Dice') > -1}">小切块</li>
                <li @click="cut('Coffee')" :class="{'k-active':Class.indexOf('Coffee') > -1}">咖啡</li>
                <li @click="cut('Ccake')" :class="{'k-active':Class.indexOf('Ccake') > -1}">常温蛋糕</li>
                <li @click="cut('Gift')" :class="{'k-active':Class.indexOf('Gift') > -1}">设计师礼品</li>
            </ul>
        </div>
        <div class="k-main">
            <div class="k-Tmain">
                <ul class="Main">
                    <li v-for="(item,idx) in data" @click="Chuan(item)">
                        <img :src="item.img_url">
                        <p> {{item.en_name}}</p>
                        <p>{{item.name}}</p>
                        <span>￥{{item.price[0]}}/{{item.spec[0]}}</span>
                        <i class="fa fa-cart-plus" @click="GoCar(item)"></i>
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
                            <img src="http://10.3.133.73:88/cake1.jpg" />
                            <p>The Moon Cake</p>
                            <p>中秋坚果芝士慕斯</p>
                            <span>￥268.00/1.0磅</span>
                            <div class="mask"></div>
                            <h2>敬请期待</h2>
                        </li>
                        <li>
                            <img src="http://10.3.133.73:88/cake39.jpg" />
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
        <div class="k-content">
            <p class="content-price">￥{{this.ProductPrice}}</p>
            <i class="end" @click="end()">x</i>
            <ul class="content-options">
                <li>
                    <i class="fa fa-square-o"></i> 
                    <span>17x17cm</span>
                </li>
                <li>
                    <i class="fa fa-square-o"></i> 
                    <span>适合7-8人分享</span>
                </li>
                <li>
                    <i class="fa fa-cutlery"></i> 
                    <span>含10套餐具</span>
                </li>
                <li>
                    <i class="fa fa-clock-o"></i> 
                    <span>须提前5小时预订</span>
                </li>
            </ul>
            <div class="content-img">
                <img src="http://10.3.133.73:88/f-tips.jpg"/>
            </div>
            <p class="product-spec">商品规格</p>
            <ul class="spec-text">
                <li v-for="(obj,idx) in Curce.spec" @click="ativex(obj,idx)" :class="{'ative':ative.indexOf(idx) > -1}">
                    <span class="spec-name">{{obj}}</span>
                </li>
            </ul>
            <button class="btn" @click="ToCar()">加入购物车(￥{{this.ProductPrice}})</button>
        </div>
        <footComponent></footComponent>
    </div>
        
</template>

<script>
    
    import footComponent from '../foot/foot.vue'
    import './classfiy.scss'
    import http from '../../utils/httpclient.js'
    import router from '../../router/router.js'

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
                show:'true',
                Curce:[],
                Class:['cake'],
                ative:[],
                ProductPrice:0
            }
        },
        components: {
           footComponent
        },
        methods:{
            cut(type,e){
                e = e || event;

                this.Class = [type]

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
                $('.zhezao').hide()
            },
            Chuan(item){

                this.$router.push({name:'details',query:{product_id:item.product_id}})
            },
            GoCar(item,e){
                e = e || event;
                e.stopPropagation();

                $('.k-content').show();

                this.ative = [0]

                this.Curce = item;

                this.ProductPrice = item.price[0]
                console.log(this.ative)
                
            },
            ativex(obj,idx){
                this.ative = [idx]
                
                this.ProductPrice = this.Curce.price[idx]
                
            },
            end(){
                $('.k-content').hide()
            },
            ToCar(){


                let dataCar = {
                    username:'lsk',
                    product_id:this.Curce.product_id,
                    img_url:this.Curce.img_url,
                    img_url1:this.Curce.img_url1,
                    name:this.Curce.name,
                    en_name:this.Curce.en_name,
                    spec:this.Curce.spec[this.ative[0]],
                    price:this.Curce.price[this.ative[0]],
                    qty:1
                }

                http.post('addProductCar',dataCar).then((res) =>{
                    console.log(res)
                    if(res.status){
                        alert('ok')
                    } else {
                        alert('no')
                    }
                })
            }
        },
        mounted(){
            http.post('getProduct',{}).then((res) =>{

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