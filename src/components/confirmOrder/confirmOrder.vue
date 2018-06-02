<template>
    <div class="order_c">
        <div class="orderTop_c">
            <span><i class="fa fa-angle-left" aria-hidden="true" @click="back"></i></span>
            <span>订单确定</span>
            <span></span>
        </div>
        <div class="orderCenter_c">
            <div class="address_c">
                <p class="t"></p>
                <div @click="pickAddress">
                    <div v-if="templateAddress!={}">
                        <p><span>收货人:{{templateAddress.receiver}}</span><span>电话:{{templateAddress.recephone}}</span></p>
                        <p>收货地址:{{templateAddress.address}} {{templateAddress.minute}}</p>
                    </div>
                    <p class="noaddress" v-else>请选择收货地址</p>
                </div>
                <p class="b"></p>
            </div>
            <div class="orderBanner_c">
                 <div class="swiper-container_c">
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide" v-for="(obj,idx) in orderData" :key="idx">
                            <img :src="obj.img_url">
                            <div>
                                <p>{{obj.spec}}</p>
                                <p>
                                    <span>{{obj.price}}</span>
                                    <span>x {{obj.qty}}</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>  
            <div class="orderTime_c">
                <ul>
                    <li @click="selectTime">
                        <p><i class="fa fa-clock-o" aria-hidden="true"></i>送货时间</p>
                        <p><span>{{currentTime == '' ? '请选择' : currentTime}}</span><i class="fa fa-angle-right" aria-hidden="true"></i></p>
                    </li>
                    <li>
                        <p>优惠卡/尊享卡</p>
                        <p><span>0张</span><i class="fa fa-angle-right" aria-hidden="true"></i></p>
                    </li>
                    <li>
                        <p>代金卡(不能与优惠券同时使用)</p>
                        <p><span>未使用</span><i class="fa fa-angle-right" aria-hidden="true"></i></p>
                    </li>
                </ul>
            </div>
            <div v-show="isSelect" class="pickMark">
                <div class="pickCon">
                   <h2>选择收货时间</h2>
                   <div>

                        <div class="swiper-container_time selectItem">
                            <ul class="swiper-wrapper">
                                <li class="swiper-slide currentTime currentTime1" v-for="(item,index) in dateArr" :key="index">
                                    {{item}}
                                </li>
                            </ul>
                        </div> 
                        <div class="swiper-container_time selectItem">
                            <ul class="swiper-wrapper">
                                <li class="swiper-slide currentTime currentTime2" v-for="(item,index) in hourArr" :key="index">
                                    {{item}}
                                </li>
                            </ul>
                        </div> 
                   </div>
                   <p>
                       <span @click="hideSelectTime">取消</span>
                       <span @click="getTime">确定</span>
                   </p>
                </div> 
            </div>
        </div>
        <div class="orderBot_c">
            <p></p>
            <p>
                <span>共<i>￥{{totalPrice}}.00</i></span>
                <span @click="addOrder">下单</span>
            </p>
            
        </div>

        <transition name="orderFade">
            <div class="orderTip" v-show="showTip">{{tip}}</div>
        </transition>
        
    </div>
</template>
<script>
import './confirmOrder.scss'
import '../../../node_modules/swiper/dist/css/swiper.css';
import Swiper from 'swiper'
import http from '../../utils/httpclient.js';
export default {
    data(){
        return{
            isSelect:false,
            showTip:false,
            tip:'',
            hourArr : [],
            dateArr : [],
            orderData : [],
            totalPrice : 0,
            address : {},
            templateAddress:{},
            totalnums:0,
            prevTime:'',
            currentTime:''
        }
    },
    methods:{
        selectTime(){
            this.isSelect = true;
        },
        hideSelectTime(){
            this.isSelect = false;
        },
        back(){
            this.$router.go(-1)
        },
        getTime(){
            if(this.prevTime == ''){
                this.currentTime = this.dateArr[1]+'-'+this.hourArr[1]
            }else{
                this.currentTime = this.prevTime;
            }
            this.isSelect = false;
            
        },
        pickAddress(){
            this.$router.push({name:'address'})
        },
        addOrder(){
            if(this.currentTime == '' || this.address == ''){
                this.tip = this.address == '' ? '请选择收货地址' : '请选择收货时间'; 
                this.showTip = true;
                setTimeout(() => {
                    this.showTip = false;
                }, 500);
                return;
            }
            
            let username = window.localStorage.getItem('username');
            let orderNum = 'GI' + Date.now();
           
            http.post('addorder',{
                username:username,
                ordernumber: orderNum,
                ispay : false,
                time :'',
                totalprice: this.totalPrice,
                totalnums: this.totalnums,
                address:  JSON.stringify(this.templateAddress),
                taketime: this.currentTime,
                products: JSON.stringify(this.orderData)
            }).then((res) => {
                if(res.status){
                    this.$router.push('/orderDet/'+orderNum);
                }   
            })
        }
    },

    mounted(){
        let username = window.localStorage.getItem('username');
        this.orderData = JSON.parse(window.localStorage.getItem('pushOrder'));
        this.orderData.forEach(order => {
            this.totalPrice += order.qty * order.price
            this.totalnums += order.qty;
        });

        let addressId = this.$route.query._id
        if(addressId == undefined){
            http.post('getaddress',{username:username,type:'default'}).then((res) => {
                console.log(res);
                if(res.status){
                    this.templateAddress = res.data[0];
                }
            })
        }else{
             http.post('getaddress',{username:username,_id:addressId}).then((res) => {
                 
                console.log(res);
                if(res.status){
                    this.templateAddress = res.data[0];
                }
            })
        }
        
        
        let  date = new Date(Date.now());
        let week = ['周日','周一','周二','周三','周四','周五','周六'];
        this.dateArr.push('')
        for (let i = 1; i <= 14; i++) {
            let dateStr = '';
            date.setDate(date.getDate() + 1);
            let m = date.getMonth() + 1;
            let d = date.getDate();
            let w = week[date.getDay()]; 
            dateStr += m + '-' + d + ' ' + w;
            this.dateArr.push(dateStr)
        }
        this.dateArr.push('')
        this.hourArr.push('')
        for(let i = 9; i < 21; i ++){
            let timeArr = '';
            timeArr += (String(i).length > 1 ? i + ': 00 - ' : '0' + i + (': 00 - ')) + (String(i).length > 1 ? i + ': 30' : '0' + i +(': 30'));
            this.hourArr.push(timeArr)
        }
        this.hourArr.push('')

        this.$nextTick(() => {
            var mySwiper = new Swiper('.swiper-container_c',{
                direction:'horizontal',
                slidesPerView:3.08,
                freeMode : true
            })
            var timeSwiper = new Swiper('.swiper-container_time',{
                direction:'vertical',
                    slidesPerView:3,
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                    observeParents:true,
                    on:{
                        slideChangeTransitionStart:(e) =>{
                        var currentTimes = document.querySelectorAll('.currentTime');
                        var currentTimes1 = document.querySelectorAll('.currentTime1');
                        var currentTimes2 = document.querySelectorAll('.currentTime2');
    
                            for (let i = 0; i < currentTimes.length; i++) {
                                currentTimes[i].style.fontWeight = 'normal'
                            }
                            this.prevTime = this.dateArr[timeSwiper[0].activeIndex+1]+' '+this.hourArr[timeSwiper[1].activeIndex+1]
                            currentTimes1[timeSwiper[0].activeIndex+1].style.fontWeight = '800'
                            currentTimes2[timeSwiper[1].activeIndex+1].style.fontWeight = '800'
                        }
                    }
            })

        })


    }
}
</script>

