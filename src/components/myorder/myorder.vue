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
                <div class="order-box" v-for="(obj,idx) in allOrderData" :key="idx">
                    <div class="order-title">
                        <span>{{obj.time}}</span>
                        <span>{{obj.ispay == 'false'?'未完成':'已完成'}}</span>
                    </div>
                    <ul class="order-product" @click="toOrderDetails(obj.ordernumber)">
                        <li v-for="(item,index) in obj.products">
                            <div class="product-img">
                                <img :src="item.img_url"/>
                            </div>
                            <div class="product-info">
                                <p class="info-name">{{item.name}}</p>
                                <p class="info-spec">{{item.spec}}</p>
                            </div>
                            <div class="product-price">
                                <p class="price">{{item.price}}</p>
                                <p class="qty">&times;{{item.qty}}</p>
                            </div>
                        </li>
                    </ul>
                    <div class="order-footer">
                        <ul class="footer-left">
                            <li>订单编号:<span>{{obj.ordernumber}}</span></li>
                            <li>商品总数:<span>{{obj.totalnums}} 件</span></li>
                            <li>实付金额:<span>{{obj.totalprice}} 元</span></li>
                        </ul>
                        <ul class="footer-right" v-if="obj.ispay == 'false'">
                            <li @click="deleteOrder({id:obj._id})"><span>取消订单</span></li>
                            <li @click="finishOrder({id:obj._id,ispay:obj.ispay})"><span>完成订单</span></li>
                        </ul>
                    </div>
                </div>
            </section>
            <section class="unfinish-order order-style animate2-route" v-show="switchActive.indexOf(1) > -1">
                <div class="order-box" v-for="(obj,idx) in unfinishOrderData" :key="idx">
                    <div class="order-title">
                        <span>{{obj.time}}</span>
                        <span>{{obj.ispay == 'false'?'未完成':'已完成'}}</span>
                    </div>
                    <ul class="order-product" @click="toOrderDetails(obj.ordernumber)">
                        <li v-for="(item,index) in obj.products">
                            <div class="product-img">
                                <img :src="item.img_url"/>
                            </div>
                            <div class="product-info">
                                <p class="info-name">{{item.name}}</p>
                                <p class="info-spec">{{item.spec}}</p>
                            </div>
                            <div class="product-price">
                                <p class="price">{{item.price}}</p>
                                <p class="qty">&times;{{item.qty}}</p>
                            </div>
                        </li>
                    </ul>
                    <div class="order-footer">
                        <ul class="footer-left">
                            <li>订单编号:<span>{{obj.ordernumber}}</span></li>
                            <li>商品总数:<span>{{obj.totalnums}} 件</span></li>
                            <li>实付金额:<span>{{obj.totalprice}} 元</span></li>
                        </ul>
                        <ul class="footer-right" v-if="obj.ispay == 'false'">
                            <li @click="deleteOrder({id:obj._id})"><span>取消订单</span></li>
                            <li @click="finishOrder({id:obj._id,ispay:obj.ispay})"><span>完成订单</span></li>
                        </ul>
                    </div>
                </div>
            </section>
            <section class="finish-order order-style animate-route" v-show="switchActive.indexOf(2) > -1">
                <div class="order-box" v-for="(obj,idx) in finishedOrderData" :key="idx">
                    <div class="order-title">
                        <span>{{obj.time}}</span>
                        <span>{{obj.ispay == 'false'?'未完成':'已完成'}}</span>
                    </div>
                    <ul class="order-product" @click="toOrderDetails(obj.ordernumber)">
                        <li v-for="(item,index) in obj.products">
                            <div class="product-img">
                                <img :src="item.img_url"/>
                            </div>
                            <div class="product-info">
                                <p class="info-name">{{item.name}}</p>
                                <p class="info-spec">{{item.spec}}</p>
                            </div>
                            <div class="product-price">
                                <p class="price">{{item.price}}</p>
                                <p class="qty">&times;{{item.qty}}</p>
                            </div>
                        </li>
                    </ul>
                    <div class="order-footer">
                        <ul class="footer-left">
                            <li>订单编号:<span>{{obj.ordernumber}}</span></li>
                            <li>商品总数:<span>{{obj.totalnums}} 件</span></li>
                            <li>实付金额:<span>{{obj.totalprice}} 元</span></li>
                        </ul>
                        <ul class="footer-right" v-if="obj.ispay == 'false'">
                            <li @click="deleteOrder({id:obj._id})" ><span>取消订单</span></li>
                            <li @click="finishOrder({id:obj._id,ispay:obj.ispay})" ><span>完成订单</span></li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
        <div id="slide-wrapper" v-show="showSlider">
            <i class="fa fa-angle-left cancel-icon" aria-hidden="true" @click="cancelOrder"></i>
            <input type="hidden" value="" id="lockable">
            <div id="slider">
                <span id="label"></span>
                <span id="lableTip">Slide to unlock!</span>
            </div>
        </div>
        <div class="myorder-masked" v-show="showMasked">
            <div class="mask-content">
                <h3 class="content-title">确定取消订单？</h3>
                <span class="btn_confirm" @click="confirmOrder">确定</span>
                <span class="btn_cancel" @click="cancelOrder">取消</span>
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
    import http from '../../utils/httpclient.js';
    export default{
        data(){
            return {
                switchData:['全部','未完成','已完成'],
                // 保存用户名
                userName:'',
                // 保存订单id
                deleteId:{},
                // 滑动支付状态
                showSlider:false,
                // 取消订单状态
                showMasked:false,
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
        mounted(){
            // 获取用户名
           this.userName = window.localStorage.getItem('username');
            
            // 初始化订单界面
            if(this.userName){
                this.getOrderData(this.userName);
            }
        },
        methods:{
            // 封一个获取数据的函数
            getOrderData(username){
                // 未完成订单数据
                let unFinish = [];
                // 已完成订单数据
                let finish = [];

                http.post('getorder',{username:'admin'}).then(res=>{
                    if(res.status){
                        for(var i =0;i<res.data.length;i++){
                            if(res.data[i].ispay == 'false'){
                                // 未完成数据
                                unFinish.push(res.data[i]);
                            }else {
                                // 已完成数据
                                finish.push(res.data[i]);
                            }
                        }

                        // 赋值
                        this.unfinishOrderData = unFinish.reverse();
                        this.finishedOrderData = finish.reverse();
                        // 全部订单数据
                        let tempOrder = this.unfinishOrderData.concat(this.finishedOrderData);
                        this.allOrderData = tempOrder.reverse();
                    }else{
                        this.unfinishOrderData = [];
                        this.finishedOrderData = [];
                        this.allOrderData = []
                    }
                })
            },
            // 封一个操作类名的函数
            handleActive(idx){
                this.switchActive = [idx];
            },
            // 封一个滑动函数
            sliderUnlock(options){
                $( ()=> {
                    var slider = new SliderUnlock("#slider", {}, ()=>{
                        setTimeout(()=>{
                            // 调用后台修改订单
                            http.post('alterorder',options).then(res=>{
                                if(res.status){
                                    this.getOrderData(this.username);
                                    this.showSlider = false;
                                    slider.reset();
                                }else{
                                    this.showSlider = false;
                                    slider.reset();
                                }
                            })
                        },600);
                    }, function(){});
                    slider.init();
                })
            },
            // 封一个删除订单的函数
            deleteOrder(id){
                this.deleteId = id;
                this.showMasked = true;
                console.log(this.deleteId)
            },
            // 封一个完成订单的函数
            finishOrder(options){
                this.showSlider = true;
                // 调用滑动函数
                this.sliderUnlock(options);
            },
            // 封一个隐藏订单遮罩窗的函数
            cancelOrder(){
                this.showMasked = false;
                this.showSlider = false;
            },
            // 封一个确认取消订单的函数
            confirmOrder(){
                if(this.deleteId){
                    http.post('delorder',this.deleteId).then(res=>{
                        if(res.status){
                            this.showMasked = false;
                            this.getOrderData(this.username);
                        }else{
                            this.showMasked = false;
                        }
                    })
                }
            },
            // 封一个跳转到用户中心的函数
            toUser(){
                this.$router.go(-1);
            },
            // 封一个跳转到订单详情的函数
            toOrderDetails(orderNum){
                this.$router.push('/orderDet/'+orderNum);
            }
        }
    }
</script>