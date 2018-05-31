<template>
    <div class="orderDet_c">
        <div class="orderTop_c">
            <span><i class="fa fa-angle-left" aria-hidden="true" @click="back"></i></span>
            <span>订单确定</span>
            <span></span>
        </div>
        <div class="orderList">
            <p><span>2018-5-6 21:00:25下单</span><span>已下单</span></p>
            <ul>
                <li>
                    <div>
                        <img src="http://m.21cake.com/upload/images/7baa87117f830d64d22b1ef255b13eea.jpg">
                        <div>
                            <p>
                                <span>爱尔兰百利甜酒</span>
                                <span>￥298.00</span>
                            </p>
                            <i>x2</i>
                        </div>
                    </div>
                </li>
            </ul>
            <p class="orderTotalPrice_c"><i>未支付:</i><span>596.00</span></p>
            <div class="orderBtm_c">
                <span>取消订单</span>
                <span @click="showPayPop">立即支付</span>
            </div>
        </div>
        <div class="orderFoot">
            <ul>
                <li>
                    <span><i>订</i><i>单</i><i>号</i>:</span>
                    <span>GI1527738224756</span>
                </li>
                <li>
                    <span><i>送</i><i>货</i><i>时</i><i>间</i>:</span>
                    <span>2018-5-513:10:00</span>
                </li>
                <li>
                    <span><i>收</i><i>货</i><i>人</i>:</span>
                    <span>Lili</span>
                </li>
                <li>
                    <span><i>联</i><i>系</i><i>电</i><i>话</i>:</span>
                    <span>13888888888</span>
                </li>
                <li>
                    <span><i>收</i><i>货</i><i>地</i><i>址</i>:</span>
                    <span>*****************22222222222 22222*********</span>
                </li>
            </ul>
        </div>
        <vue-pay-pop ref="pay" :payPopOptions="payPopOptions" @inputDown="inputDown" >
          
        </vue-pay-pop>
    </div>
</template>

<script>
import './orderDet.scss'
import Vue from 'vue'
import vuePayPop from 'vue-pay-pop'
Vue.use(vuePayPop)
export default {
    data(){
        return{
            payPopOptions: {
                isShow : false,
                loadingTxt : "正在支付..."
          }
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        inputDown(val) {
            
        //模拟检查数据
            setTimeout(() => {
            if (val == '111111') {
                console.log(666);
                
                this.$refs.pay.$payStatus(true)
            } else {
                console.log(777);
                this.$refs.pay.$payStatus(false)
            }
            }, 500)
        },
      showPayPop() {
        this.payPopOptions.isShow = true;
      }
    }
}
</script>
