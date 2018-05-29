<template>
    <div class="order_c">
        <div class="orderTop_c">
            <span><i class="fa fa-angle-left" aria-hidden="true" @click="back"></i></span>
            <span>订单确定</span>
            <span></span>
        </div>
        <div class="orderCenter_c">
            <div class="address_c">
                <p></p>
                <p>选择收货地址</p>
                <p></p>
            </div>
            <div class="orderBanner_c">
                 <div class="swiper-container_c">
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide">
                            <img src="http://static.21cake.com/public/images/91/57/75/c9c2df9e4fac3c22d34b1de18c317a98.jpg">
                            <div>
                                <p>2.0磅</p>
                                <p>
                                    <span>199.00</span>
                                    <span>*4</span>
                                </p>
                            </div>
                        </li>
                        <li class="swiper-slide">
                            <img src="http://static.21cake.com/public/images/91/57/75/c9c2df9e4fac3c22d34b1de18c317a98.jpg">
                            <div>
                                <p>2.0磅</p>
                                <p>
                                    <span>199.00</span>
                                    <span>*4</span>
                                </p>
                            </div>
                        </li>
                        <li class="swiper-slide">
                            <img src="http://static.21cake.com/public/images/91/57/75/c9c2df9e4fac3c22d34b1de18c317a98.jpg">
                            <div>
                                <p>2.0磅</p>
                                <p>
                                    <span>199.00</span>
                                    <span>*4</span>
                                </p>
                            </div>
                        </li>
                        <li class="swiper-slide">
                            <img src="http://static.21cake.com/public/images/91/57/75/c9c2df9e4fac3c22d34b1de18c317a98.jpg">
                            <div>
                                <p>2.0磅</p>
                                <p>
                                    <span>199.00</span>
                                    <span>*4</span>
                                </p>
                            </div>
                        </li>
                        <li class="swiper-slide">
                            <img src="http://static.21cake.com/public/images/91/57/75/c9c2df9e4fac3c22d34b1de18c317a98.jpg">
                            <div>
                                <p>2.0磅</p>
                                <p>
                                    <span>199.00</span>
                                    <span>*4</span>
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
                <span>共￥<i>2292.00</i></span>
                <span>下单</span>
            </p>
            
        </div>
        
    </div>
</template>
<script>
import './order.scss'
import '../../../node_modules/swiper/dist/css/swiper.css';
import Swiper from 'swiper'
export default {
    data(){
        return{
            isSelect:false,
            hourArr : [],
            dateArr : [],
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
            
        }
    },

    mounted(){


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


    }
}
</script>

