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
            <div class="swiper-container ">
                <div class="swiper-wrapper main-banner">
                    <div class="swiper-slide" v-for="(obj,idx) in bannerData" :key="idx">
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
                        <li v-for="(item,index) in obj.data" :key="index">
                            <div class="info-img">
                                <img :src="item.img_url" /> 
                            </div>
                            <div class="info-text">
                                <div class="info-left">
                                    <p class="name">
                                        {{item.name}} 
                                        <span>{{item.price}}</span>

                                        <em> 元 /{{item.spec}}</em>
                                    </p>
                                    <p class="en_name">
                                        {{item.en_name}}
                                    </p>
                                </div>
                                <div class="info-right">
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
                <div class="wrap-magazine" v-for="(obj,idx) in magazineData">
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
    export default{
        data(){
            return {
                bannerData:[
                    {
                        name: "咖啡",
                        href: "/gallery-index---0---3.html",
                        target: "_self",
                        img_url: "http://m.21cake.com/upload/images/84a103812e4575703cf64032c5f92db8.jpg",
                        sort: 3,
                        special_effects: "fadeIn",
                        type:"banner"
                    },
                    {
                        name: "浅草",
                        href: "/goods-750.html",
                        target: "_self",
                        img_url: "http://m.21cake.com/upload/images/3d0a68efc32f85969e5032b3bf601d73.jpg",
                        sort: 4,
                        special_effects: "fadeIn",
                        type:"banner"

                    },
                    {
                        name: "榴莲",
                        href: "/goods-9.html",
                        target: "_self",
                        img_url: "http://m.21cake.com/upload/images/c2785c719df8ab69ee878aee7a4d9064.jpg",
                        sort: 5,
                        special_effects: "fadeIn",
                        type:"banner"

                    }
                ],
                tipsData:[
                    {name:"新人首单赠小切块",type:"tips"},
                    {name:"满百包邮",type:"tips"},
                    {name:"千万用户选择",type:"tips"}
                ],
                navData:[
                    {
                        name: "蛋糕",
                        img_url: "http://m.21cake.com/upload/images/b24fa9c0d277b79493fead122afe8e73.png",
                        type:"nav"
                    },
                    {
                        name: "咖啡",
                        img_url: "http://m.21cake.com/upload/images/6b2bb02a6d83ca8f36f0eaafebe3b1b3.png",
                        type:"nav"
                    },
                    {
                        name: "企业专区",
                        img_url: "http://m.21cake.com/upload/images/6d777e1d3aa1681d58ea1640f53e2920.png",
                        type:"nav"
                    },
                    {
                        name: "小切块",
                        img_url: "http://m.21cake.com/upload/images/a22e889a75b6db374db1451015a47c24.png",
                        type:"nav"
                    }
                ],
                productData:[
                    {
                        title:'新品',
                        type:'newProduct',
                        more:'更多',
                        data:[
                           {
                                product_id: "12824",
                                name: "浅草",
                                en_name: "中国绿茶与爽脆果实",
                                href: "/goods-750.html",
                                target: "_blank",
                                img_url: "http://m.21cake.com/upload/images/7baa87117f830d64d22b1ef255b13eea.jpg",
                                price: "298.00",
                                spec: "2.0磅"
                            },
                            {
                                product_id: "642",
                                name: "芒果慕斯",
                                en_name: "优质芒果的三种姿态，与青柠酸乳酪夹心",
                                href: "/goods-21.html",
                                target: "_blank",
                                img_url: "http://m.21cake.com/upload/images/cf4db0e0c4a15b350a377243bfb87ede.jpg",
                                price: "298.00",
                                spec: "2.0磅"
                            },
                            {
                                product_id: "11191",
                                name: "枣儿",
                                en_name: "红枣奶油戚风，与姜撞奶慕斯",
                                href: "/goods-631.html",
                                target: "_blank",
                                img_url: "http://m.21cake.com/upload/images/e602222e603990bab1880f69103908b4.jpg",
                                price: "298.00",
                                spec: "2.0磅"
                            }
                        ]
                    },
                    {
                        title:'人气',
                        type:'popularity',
                        more:'更多',
                        data:[
                            {
                                product_id: "378",
                                name: "百利甜情人",
                                en_name: "爱尔兰百利甜酒/新西兰奶油/云南玫瑰甘露",
                                href: "goods-12.html",
                                target: "_blank",
                                img_url: "http://m.21cake.com/upload/images/de7f5cade140bd0c5a49cb853b8249f1.jpg",
                                price: "298.00",
                                spec: "2.0磅"
                            },
                            {
                                product_id: "9179",
                                name: "芒果奶油",
                                en_name: "坚持自然成熟，应季鲜切芒果",
                                href: "/goods-472.html",
                                target: "_blank",
                                img_url: "http://m.21cake.com/upload/images/e780de9efeaf1d9c489347149290c6cb.jpg",
                                price: "198.00",
                                spec: "2.0磅"
                            },
                            {
                                product_id: "264",
                                name: "榴莲飘飘",
                                en_name: "严格捍卫榴莲狂热者的权利",
                                href: "/goods-9.html",
                                target: "_blank",
                                img_url: "http://m.21cake.com/upload/images/027544cfa7cca26f8b64edaea2777e5e.jpg",
                                price: "298.00",
                                spec: "2.0磅"
                            },
                            {
                                product_id: "12176",
                                name: "（彼尔德）黑白巧克力",
                                en_name: "白巧克力慕斯的甜，与底部黑巧克力酱的苦",
                                href: "/goods-702.html",
                                target: "_blank",
                                img_url: "http://m.21cake.com/upload/images/4941946dc7be2d46028dd54ec4c06bf2.jpg",
                                price: "298.00",
                                spec: "2.0磅"
                            }
                        ]
                    },
                    {
                        title:'新品',
                        type:'newProduct',
                        more:'更多',
                        data:[
                            {
                                product_id: "12824",
                                name: "浅草",
                                en_name: "中国绿茶与爽脆果实",
                                href: "/goods-750.html",
                                target: "_blank",
                                img_url: "http://m.21cake.com/upload/images/7baa87117f830d64d22b1ef255b13eea.jpg",
                                price: "298.00",
                                spec: "2.0磅"
                            },
                            {
                                product_id: "642",
                                name: "芒果慕斯",
                                en_name: "优质芒果的三种姿态，与青柠酸乳酪夹心",
                                href: "/goods-21.html",
                                target: "_blank",
                                img_url: "http://m.21cake.com/upload/images/cf4db0e0c4a15b350a377243bfb87ede.jpg",
                                price: "298.00",
                                spec: "2.0磅"
                            },
                            {
                                product_id: "11191",
                                name: "枣儿",
                                en_name: "红枣奶油戚风，与姜撞奶慕斯",
                                href: "/goods-631.html",
                                target: "_blank",
                                img_url: "http://m.21cake.com/upload/images/e602222e603990bab1880f69103908b4.jpg",
                                price: "298.00",
                                spec: "2.0磅"
                            }
                        ]
                    }
                ],
                activityData:[
                    {   
                        title:'廿一客·活动',
                        remain: "只剩218天",
                        name: "新客权益",
                        en_name: "点击查看",
                        img_url: "http://m.21cake.com/upload/images/9bfa8ea6a193c5877646c375119515ef.jpg",
                        type:'activity'
                    }
                ],
                magazineData:[
                    {
                        title: "廿一客·文章",
                        type: "magazine",
                        more:"更多",
                        data: [
                            {
                                product_id: "195",
                                img_url: "http://m.21cake.com/public/images/3d/43/9f/25ce5c548005eb49b7b59f1fc3746311.jpg",
                                name: "三月刊·私享",
                                href: "/magazine/detail/195.html",
                            },
                            {
                                product_id: "186",
                                img_url: "http://m.21cake.com/public/images/32/53/be/e10f0267da7024f026923476510063fe.jpg",
                                name: "二月刊·蛋糕.JPEG",
                                href: "/magazine/detail/186.html",
                            },
                            {
                                product_id: "182",
                                img_url: "http://m.21cake.com/public/images/b6/58/9b/eeb59753f02331f1d12cd8042ac09eec.jpg",
                                name: "一月刊·姜",
                                href: "/magazine/detail/182.html",
                            },
                            {
                                product_id: "178",
                                img_url: "http://m.21cake.com/public/images/38/58/43/6593ccc095aaab42d068f1269d342b8a.jpg",
                                name: "十二月刊·松子",
                                href: "/magazine/detail/178.html",
                            }
                        ]
                    }
                ],
                cityData:[
                    {
                        name:"选择城市",
                        button:"确定",
                        type:'city',
                        data:[
                            "上海","北京","天津","杭州",
                            "无锡","苏州","广州","深圳"
                        ]
                    }
                ],
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
            // 初始化城市名字
            let cityInfo = JSON.parse(window.localStorage.getItem('cityInfo'));
            if(cityInfo){
                this.defaultCity = cityInfo.name;
                this.changeIndex = cityInfo.index;
                this.activeArr = [this.changeIndex];
            }
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
            // 杂志轮播图
            var magazineSwiper = new Swiper('.wrap-magazine',{
                direction:'horizontal',
                slidesPerView:1.5
            })
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
                console.log(this.changeIndex)
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
            addToCart(item,e){console.log(item)
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
                },1000);
            }
        }



       
    }
    
</script>