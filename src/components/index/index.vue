<template>
    <div class="f-index">
        <div class="index-masked" v-if="this.showStatus" @click="hideCity">
            <div class="masked-box" v-for="(obj,idx) in cityData" @click="stopProp()">
                <h3 class="city-title">{{obj.name}}</h3>
                <ul class="city-content" >
                    <li v-for="(item,index) in obj.data" :key="index" @click="selectActive(index,$event)" :class="{'active':activeArr.indexOf(index) > -1}">
                        <span class="city-name">{{item}}</span>
                    </li>
                </ul>
                <span class="city-button" @click="saveCity">{{obj.button}}</span>
            </div>
        </div>
        <header class="index-header">
            <ul class="header-ul">
                <li>
                    <img src="http://static.21cake.com/themes/wap/img/logo.png" />
                </li>
                <li>
                    <i class="fa fa-search fdj" aria-hidden="true"></i>
                    <input type="text" class="header-input" placeholder="搜索商品"/>
                </li>
                <li @click="showCity()">
                    <div class="header-location">
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        <span>{{this.defaultCity}}</span>
                     </div>
                </li>
            </ul>
        </header>
        <main class="index-main">
            <div class="swiper-container " >
                <div class="swiper-wrapper main-banner" >
                    <div class="swiper-slide" v-if="bannerData.length > 0"  v-for="(obj,idx) in bannerData" :key="idx">
                        <img :src="obj.img_url" />
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <div class="main-wrap">
                <ul class="wrap-tips" >
                    <li v-for="(obj,idx) in tipsData" :key="idx">
                        <em></em>
                        <span>{{obj.name}}</span>
                    </li>
                </ul>
                <ul class="wrap-nav">
                    <li v-for="(obj,idx) in navData" :key="idx">
                        <img :src="obj.img_url" />
                        <span>{{obj.name}}</span>
                    </li>
                </ul>
                <div class="wrap-content" v-for="(obj,idx) in productData" :key="idx">
                    <div class="content-title">
                        <span class="title">{{obj.title}}</span>
                        <span class="more">{{obj.more}}</span>
                    </div>
                    <ul class="content-info">
                        <li v-for="(item,index) in obj.data" :key="index" @click="toDetails(item.product_id)">
                            <div class="info-img">
                                <img :src="item.img_url" /> 
                            </div>
                            <div class="info-text">
                                <div class="info-left">
                                    <p class="name">
                                        {{item.name}} 
                                        <span>{{item.price[0]}}</span>
                                        <em> 元 /{{item.spec[0]}}</em>
                                    </p>
                                    <p class="en_name">
                                        {{item.en_name}}
                                    </p>
                                </div>
                                <div class="info-right" @click="stopProp()">
                                    <button class="btn-car" @click="addToCart(item,$event)"></button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="wrap-activity" v-for="(obj,idx) in activityData">
                    <div class="activity-title">
                        <span>{{obj.title}}</span>
                    </div>
                    <ul class="activity-content">
                        <li>
                            <p class="activity-name">{{obj.name}}</p>
                            <p class="activity-en_name">{{obj.en_name}}</p>
                            <p class="activity-remain">{{obj.remain}}</p>
                        </li>
                        <li>
                            <img :src="obj.img_url"  />
                        </li>
                    </ul>
                </div>
                <div class="wrap-magazine" v-if="magazineData.length > 0" v-for="(obj,idx) in magazineData">
                    <div class="magazine-title">
                        <span>
                            {{obj.title}}
                        </span>
                        <span>
                            {{obj.more}}
                        </span>
                    </div>
                    <ul class="swiper-wrapper manazine-box">
                        <li class="swiper-slide" v-for="(item,index) in obj.data" :key="index">
                            <img v-if="item.img_url" :src="item.img_url" />
                            <p class="manazine-info">{{item.name}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
        <footComponent></footComponent>
    </div>
        
</template>
<script>
    import './index.scss';
    import '../../../node_modules/swiper/dist/css/swiper.css';
    import footComponent from '../foot/foot.vue'
    import Swiper from 'swiper';
    import $ from 'jquery';
    import http from '../../utils/httpclient.js';
    export default{
        data(){
            return {
                bannerData:[],
                tipsData:[],
                navData:[],
                productData:[],
                activityData:[],
                magazineData:[],
                cityData:[],
                // 显示状态
                showStatus:false,
                // 选中类名
                activeArr:[0],
                // 默认城市
                defaultCity:'上海',
                changeCity:'',
                changeIndex:0
            }
        },
        components: {
           footComponent
        },
        mounted(){
            // 获取数据
            // 首页轮播图
            var banner = []; 
            // 提示
            var tips = []; 
            // 导航
            var nav = [];
            // 商品
            var product = [];
            // 活动
            var activity = [];
            // 杂志
            var magazine = [];
            // 城市
            var city = [];
            http.post('getProduct',{}).then(res=>{
                console.log(res)
                if(res.status){
                    for(var i=0;i<res.data.length;i++){
                        let type = res.data[i].type;
                        if(type == 'banner'){
                            banner.push(res.data[i])
                        }else if(type == 'tips'){
                            tips.push(res.data[i])
                        }else if(type == 'nav'){
                            nav.push(res.data[i]);
                        }else if(type == 'newProduct'){
                            product.push(res.data[i]);
                        }else if(type == 'popularity'){
                            product.push(res.data[i])
                        }else if(type == 'activity'){
                            activity.push(res.data[i])
                        }else if(type == 'magazine'){
                            magazine.push(res.data[i])
                        }else if(type == 'city'){
                            city.push(res.data[i]);
                        }
                    }
                    // 赋值操作
                    this.bannerData = banner;
                   
                    this.tipsData = tips;
                    this.navData = nav;
                    this.productData = product;
                    this.activityData = activity;
                    this.magazineData = magazine;
                    this.cityData = city;

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
                            },
                            // observer:true,//修改swiper自己或子元素时，自动初始化swiper
                            // observeParents:true,
                        });
                        // 杂志轮播图
                        var magazineSwiper = new Swiper('.wrap-magazine',{
                            direction:'horizontal',
                            slidesPerView:1.5,
                            // observer:true,//修改swiper自己或子元素时，自动初始化swiper
                            // observeParents:true,
                        })
                    })

                }
            })
            // 初始化城市名字
            let cityInfo = JSON.parse(window.localStorage.getItem('cityInfo'));
            if(cityInfo){
                this.defaultCity = cityInfo.name;
                this.changeIndex = cityInfo.index;
                this.activeArr = [this.changeIndex];
            }
        },
        methods:{
            // 显示城市
            showCity(e){
                this.showStatus = true;
            },
            //隐藏城市
            hideCity(){
                this.showStatus = false;
            },
            // 阻止冒泡
            stopProp(e){
                e = e || event;
                e.stopPropagation();
            },
            // 选择城市类名
            selectActive(index,e){
                this.activeArr = [index];
                this.changeCity = e.target.innerText;
                this.changeIndex = index;
            },
            // 保存城市名字
            saveCity(){
                if(this.changeCity){
                    // 获取城市数据，并保存城市名
                    window.localStorage.setItem('cityInfo',JSON.stringify({"name":this.changeCity,"index":this.changeIndex}));
                    this.defaultCity = this.changeCity;
                    this.showStatus = false;
                }else{
                    this.showStatus = false;
                }
            },
            // 添加到购物车
            addToCart(item,e){
                let x = e.pageX;
                let y = e.pageY;
                // 创建图片元素
                let $flyImg = $('<img />');
                $flyImg.attr('src',item.img_url);
                $flyImg.css({
                    width:40,
                    height:40,
                    position:'absolute',
                    left:x-20,
                    top:y-10,
                    zIndex:9999,
                    borderRadius:20
                });
                $('body').append($flyImg);  
                $flyImg.animate({top:620,left:185,width:5,height:5,opacity:0.5},1000);
                setTimeout(function(){
                    // 移除元素
                    $flyImg.remove();
                    item.price = item.price[0];
                    item.spec = item.spec[0];
                    console.log(item);
                },1000);
            },
            // 获取商品id并跳转到详情页
            toDetails(product_id){
                this.$router.push({name:'details',params:{product_id}});
            }
        }
    }
    
</script>