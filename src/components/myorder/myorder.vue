<template>
    <div class="f-myorder">
        <header class="myorder-header">
            <ul class="header-title">
                <li @click="toUser">
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </li>
                <li>
                    <span class="header-title">我的订单</span>
                </li>
                <li></li>
            </ul>
            <ul class="header-switch">
                <li v-for="(obj,idx) in switchData" :key="idx" @click = "handleActive(idx)" :class="{'active':switchActive.indexOf(idx) > -1}" >
                    <span class="switch-text">{{obj}}</span>
                </li>
            </ul>
        </header>
        <main class="myorder-main">
            <section class="all-order order-style animate-route" v-show="switchActive.indexOf(0) > -1" >
                <div class="order-box">
                    <div class="order-title">
                        <span>2018-06-01 09:30</span>
                        <span>已完成</span>
                    </div>
                    <ul class="order-product">
                        <li>
                            <div class="product-img">
                                <img src="http://m.21cake.com/upload/images/de7f5cade140bd0c5a49cb853b8249f1.jpg" alt="" />
                            </div>
                            <div class="product-info">
                                <p class="info-name">浅草</p>
                                <p class="info-spec">2.0磅</p>
                            </div>
                            <div class="product-price">
                                <p class="price">299</p>
                                <p class="qty">&times;1</p>
                            </div>
                        </li>
                        <li>
                            <div class="product-img">
                                <img src="http://m.21cake.com/upload/images/de7f5cade140bd0c5a49cb853b8249f1.jpg" alt="" />
                            </div>
                            <div class="product-info">
                                <p class="info-name">浅草</p>
                                <p class="info-spec">2.0磅</p>
                            </div>
                            <div class="product-price">
                                <p class="price">299</p>
                                <p class="qty">&times;1</p>
                            </div>
                        </li>
                    </ul>
                    <div class="order-footer">
                        <ul class="footer-left">
                            <li>订单编号:<span>1234567890</span></li>
                            <li>商品总数:<span>2 件</span></li>
                            <li>实付金额:<span>299 元</span></li>
                        </ul>
                        <ul class="footer-right">
                            <li @click="deleteOrder()"><span>取消订单</span></li>
                            <li @click="finishOrder()"><span>完成订单</span></li>
                        </ul>
                    </div>
                </div>
            </section>
            <section class="unfinish-order order-style animate2-route" v-show="switchActive.indexOf(1) > -1">
                <div class="order-box">
                    <div class="order-title">
                        <span>2018-06-01 09:30</span>
                        <span>未完成</span>
                    </div>
                    <ul class="order-product">
                        <li>
                            <div class="product-img">
                                <img src="http://m.21cake.com/upload/images/de7f5cade140bd0c5a49cb853b8249f1.jpg" alt="" />
                            </div>
                            <div class="product-info">
                                <p class="info-name">浅草</p>
                                <p class="info-spec">2.0磅</p>
                            </div>
                            <div class="product-price">
                                <p class="price">299</p>
                                <p class="qty">&times;1</p>
                            </div>
                        </li>

                        <li>
                            <div class="product-img">
                                <img src="http://m.21cake.com/upload/images/de7f5cade140bd0c5a49cb853b8249f1.jpg" alt="" />
                            </div>
                            <div class="product-info">
                                <p class="info-name">浅草</p>
                                <p class="info-spec">2.0磅</p>
                            </div>
                            <div class="product-price">
                                <p class="price">299</p>
                                <p class="qty">&times;1</p>
                            </div>
                        </li>
                    </ul>
                    <div class="order-footer">
                        <ul class="footer-left">
                            <li>订单编号:<span>1234567890</span></li>
                            <li>商品总数:<span>2 件</span></li>
                            <li>实付金额:<span>299 元</span></li>
                        </ul>
                        <ul class="footer-right">
                            <li><span>取消订单</span></li>
                            <li><span>完成订单</span></li>
                        </ul>
                    </div>
                </div>   
            </section>
            <section class="finish-order order-style animate-route" v-show="switchActive.indexOf(2) > -1">
                <div class="order-box">
                    <div class="order-title">
                        <span>2018-06-01 09:30</span>
                        <span>已完成</span>
                    </div>
                    <ul class="order-product">
                        <li>
                            <div class="product-img">
                                <img src="http://m.21cake.com/upload/images/de7f5cade140bd0c5a49cb853b8249f1.jpg" alt="" />
                            </div>
                            <div class="product-info">
                                <p class="info-name">浅草</p>
                                <p class="info-spec">2.0磅</p>
                            </div>
                            <div class="product-price">
                                <p class="price">299</p>
                                <p class="qty">&times;1</p>
                            </div>
                        </li>

                        <li>
                            <div class="product-img">
                                <img src="http://m.21cake.com/upload/images/de7f5cade140bd0c5a49cb853b8249f1.jpg" alt="" />
                            </div>
                            <div class="product-info">
                                <p class="info-name">浅草</p>
                                <p class="info-spec">2.0磅</p>
                            </div>
                            <div class="product-price">
                                <p class="price">299</p>
                                <p class="qty">&times;1</p>
                            </div>
                        </li>
                    </ul>
                    <div class="order-footer">
                        <ul class="footer-left">
                            <li>订单编号:<span>1234567890</span></li>
                            <li>商品总数:<span>2 件</span></li>
                            <li>实付金额:<span>299 元</span></li>
                        </ul>
                        <ul class="footer-right">
                            <li><span>取消订单</span></li>
                            <li><span>完成订单</span></li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
        <div id="slide-wrapper" v-show="showSlider">
            <input type="hidden" value="" id="lockable">
            <div id="slider">
                <span id="label"></span>
                <span id="lableTip">Slide to unlock!</span>
            </div>
        </div>
    </div>
</template>
<script>
    import './myorder.scss';
    // 引入滑动插件
    import '../libs/slide/css/normalize.css';
    import '../libs/slide/css/jquery.slideunlock.css';
    import $ from 'jquery';
    export default{
        data(){
            return {
                switchData:['全部','未完成','已完成'],
                showSlider:false,
                // 切换类名
                switchActive:[0],
                // 全部订单
                allOrderData:[],
                // 未完成订单
                unfinishOrderData:[],
                // 已完成订单
                finishedOrderData:[]
            }
        },
        methods:{
            // 封一个操作类名的函数
            handleActive(idx){
                this.switchActive = [idx];
            },
            // 封一个滑动函数
            sliderUnlock(){
                $( ()=> {
                    var slider = new SliderUnlock("#slider", {}, ()=>{
                        setTimeout(()=>{
                            this.showSlider = false;
                            slider.reset();
                        },600);
                    }, function(){});
                    slider.init();
                })
            },
            // 封一个删除订单的函数
            deleteOrder(){
            },
            // 封一个完成订单的函数
            finishOrder(){
                this.showSlider = true;
                // 调用滑动函数
                this.sliderUnlock();
            },
            // 封一个跳转到用户中心的函数
            toUser(){
                this.$router.go(-1);
            }

        },
        mounted(){
        }
    }
</script>