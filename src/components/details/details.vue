<template>
    <div class="f-details">
        <div class="details-masked" v-show="this.showTips">
            <span class="tips-text">加入购物车成功</span>
        </div>
        <header class="details-header">
            <ul class="header-wrap">
                <li @click="toIndex">
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </li>
                <li>
                    <span v-if="this.productData.length > 0">{{this.productData[0].name}}</span>
                </li>
                <li>
                    <i class="fa fa-search" aria-hidden="true"></i>
                </li>
            </ul>
        </header>
        <main class="details-main">
            <div class="swiper-container ">
                <div class="swiper-wrapper main-banner">
                    <div class="swiper-slide" v-for="(obj,idx) in bannerData">
                        <img  :src="obj"/>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <section class="details-content">
                <div class="product-info" v-if="this.productData.length > 0">
                    <p class="info-en_name" >{{this.productData[0].en_name}}</p>
                    <p class="info-name">{{this.productData[0].name}}</p>
                    <p class="info-price"> ￥{{this.defaultPrice}}</p>
                </div>
                <div class="product-params">
                    <ul class="params-title" @click="showMasked">
                        <li >
                            已选择：<span>{{this.defaultSpec}}</span>
                        </li>
                        <li>
                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                        </li>
                    </ul>
                    <ul class="params-content">
                        <li v-for="(obj,idx) in paramsData">
                            <i :class="obj.icon" aria-hidden="true"></i> 
                            <span>{{obj.text}}</span>
                        </li>
                    </ul>
                    <ul class="params-tips">
                        <li>
                            <i class="fa fa-snowflake-o" aria-hidden="true"></i>
                            <p>保鲜条件<span>0－4℃保藏10小时，5℃食用为佳</span></p>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
        <footer class="details-footer">
            <ul class="footer-button">
                <li>
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span>50</span>
                </li>
                <li @click="showMasked({type:'cart'})">
                    <span>立即购买</span>
                </li>
                <li @click="showMasked">
                    <span>加入购物车</span>
                </li>
            </ul>
            <div class="footer-masked" v-show="this.status" @click="hideMasked">
            </div>
            <div class="masked-content">
                <p class="content-price">￥{{this.defaultPrice}}</p>
                <div class="content-img">
                    <img src="http://10.3.133.73:88/f-tips.jpg"/>
                    <ul class="content-options">
                        <li v-for="(obj,idx) in paramsData">
                            <i :class="obj.icon" aria-hidden="true"></i> 
                            <span>{{obj.text}}</span>
                        </li>
                    </ul>
                </div>
                <p class="product-spec">商品规格</p>
                <ul class="spec-text" v-if="this.productData.length > 0">
                    <li v-for="(obj,idx) in productData[0].spec" @click="selectActive(idx,$event)" :class="{'active':activeArr.indexOf(idx) > -1}">
                        <span class="spec-name">{{obj}}</span>
                    </li>
                </ul>
            </div>
        </footer>
    </div>
</template>

<script>
    import './details.scss';
    import '../../../node_modules/swiper/dist/css/swiper.css';
    import Swiper from 'swiper';
    import $ from 'jquery';
    import http from '../../utils/httpclient.js';
    export default{
        data(){
            return {
                productData:[],
                bannerData:[
                    // "http://m.21cake.com/upload/images/7baa87117f830d64d22b1ef255b13eea.jpg",
                    // "http://m.21cake.com/upload/images/7baa87117f830d64d22b1ef255b13eea.jpg"
                ],
                paramsData:[
                    {
                        icon:'fa fa-square-o',
                        text:'17x17cm'
                    },
                    {
                        icon:'fa fa-cutlery',
                        text:'适合7-8人分享'
                    },
                    {
                        icon:'fa fa-cutlery',
                        text:'含10套餐具'
                    },
                    {
                        icon:'fa fa-clock-o',
                        text:'最早明天09:30配送'
                    }
                ],
                // 参数面板的状态
                status:false,
                // 选择类名
                activeArr:[0],
                // 默认价格
                defaultPrice:0,
                // 默认磅数
                defaultSpec:'',
                // 默认用户商品数组
                userProduct :{},
                showTips:false

            }
        },
        mounted(){
            // 接收商品id和类型
            let type ='' ;
            if(this.$route.query.type){
                type = this.$route.query.type;
            }
            let product_id = this.$route.query.product_id;
            console.log(this.$route)
            // 向后端获取商品数据
            http.post('getProduct',{type,id:product_id}).then(res=>{
                console.log(res)
                if(res.status){
                    this.productData = res.data;
                    // 初始化数据
                    this.defaultPrice = this.productData[0].price[0];
                    this.defaultSpec = this.productData[0].spec[0];
                    this.bannerData = [this.productData[0].img_url,this.productData[0].img_url1]
                    this.$nextTick(function(){
                        // 首页轮播图
                        var mySwiper = new Swiper ('.swiper-container', {
                            direction: 'horizontal',
                            loop:true,
                            autoplay: {
                                delay: 3000,
                                stopOnLastSlide: false,
                                disableOnInteraction: false,
                            },
                            // 如果需要分页器
                            pagination: {
                              el: '.swiper-pagination',
                              clickable :true,
                            }
                        });
                    })
                }
            })
            
        },
        methods:{
            // 封一个深度克隆数据的函数
            deepClone(){
                // 用户数组
                // let userName = window.localStorage.getItem('userName');
                let userName = 'admin';
                let _userProduct = JSON.stringify(this.productData[0]);
                this.userProduct = JSON.parse(_userProduct);
                this.userProduct.username = userName;
                this.userProduct.spec = this.defaultSpec;
                this.userProduct.price = this.defaultPrice;
            },
            // 封一个显示参数面板的函数
            showMasked(opt){
                // 将状态取反
                this.status = !this.status;
                if(this.status){
                    let $maskedContent = $('.masked-content');
                    $maskedContent.animate({bottom:50},500);
                }else if(opt.type == 'cart'){
                    // 获取商品信息并跳转到购物车
                    this.deepClone();
                    // 购买：插入数据库并跳转到购物车
                    console.log(this.userProduct);

                    // 调用隐藏函数
                    this.hideMasked();
                }else{
                    // 调用深度克隆函数
                    this.deepClone();
                    // 加入：保存到本地存储
                    console.log(this.userProduct);
                    // window.localStorage.setItem('userProduct',JSON.stringify(this.userProduct));
                    // http.post('addProduct',{this.userProduct}).then(res=>{})
                    this.showTips = true;
                    setTimeout(()=>{
                        this.showTips = false;
                    },500);
                    this.hideMasked();
                }
            },
            // 封一个隐藏参数面板的函数
            hideMasked(){
                this.status = false;
                let $maskedContent = $('.masked-content');
                $maskedContent.animate({bottom:-240},10);
            },
            // 封一个选择类名的函数
            selectActive(idx,e){
                this.activeArr = [idx];
                // 修改商品参数
                this.defaultPrice = this.productData[0].price[idx];
                this.defaultSpec = this.productData[0].spec[idx];
            },
            // 跳回首页
            toIndex(){
                this.$router.push('/');
            }
        }
    }
</script>