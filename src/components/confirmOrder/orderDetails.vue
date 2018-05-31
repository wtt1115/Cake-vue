<template>
    <div class="orderDet_c">
        <div class="orderTop_c">
            <span><i class="fa fa-angle-left" aria-hidden="true" @click="back"></i></span>
            <span>订单确定</span>
            <span></span>
        </div>
        <div class="orderList">
            <p><span>{{orderData.time}}下单</span><span>已下单</span></p>
            <ul>
                <li v-for="(obj,idx) in orderData.products" :key="idx">
                    <div>
                        <img :src="obj.img_url">
                        <div>
                            <p>
                                <span>{{obj.name}}</span>
                                <span>￥{{obj.price}}</span>
                            </p>
                            <i>x{{obj.qty}}</i>
                        </div>
                    </div>
                </li>
            </ul>
            <p class="orderTotalPrice_c"><i v-if="orderData.ispay == 'true'">已支付:</i><i v-else>未支付:</i><span>￥{{orderData.totalprice}}.00</span></p>
        </div>
        <div class="orderFoot">
            <div class="orderBtm_c" v-if="orderData.ispay == 'false'">
                <span @click="delOrder">取消订单</span>
                <span @click="showPayPop">立即支付</span>
            </div>
            <ul>
                <li>
                    <span><i>订</i><i>单</i><i>号</i>:</span>
                    <span>{{orderData.ordernumber}}</span>
                </li>
                <li>
                    <span><i>送</i><i>货</i><i>时</i><i>间</i>:</span>
                    <span>{{orderData.taketime}}</span>
                </li>
                <li>
                    <span><i>收</i><i>货</i><i>人</i>:</span>
                    <span>{{concat.receiver}}</span>
                </li>
                <li>
                    <span><i>联</i><i>系</i><i>电</i><i>话</i>:</span>
                    <span>{{concat.recephone}}</span>
                </li>
                <li>
                    <span><i>收</i><i>货</i><i>地</i><i>址</i>:</span>
                    <span>{{concat.address}} {{concat.minute}}</span>
                </li>
            </ul>
        </div>
        <vue-pay-pop ref="pay" :payPopOptions="payPopOptions" @inputDown="inputDown" >
        </vue-pay-pop>
        <div class="leaveTip" v-if="showTip">
            <div class="tipCon">
                <p>{{tipText.title}}</p>
                <p><span @click="cancel">{{tipText.cancel}}</span><span @click="confirm">{{tipText.ok}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
import './orderDet.scss'
import Vue from 'vue'
import vuePayPop from 'vue-pay-pop'
import http from '../../utils/httpclient.js';
Vue.use(vuePayPop)
export default {
    data(){
        return{
            orderData:{},
            concat:'',
            showTip: false,
            tipText:{},
            payPopOptions: {
                isShow : false,
                loadingTxt : "正在支付..."
          }
        }
    },
    methods:{
        back(){
            this.tipText = {
                type : 'back',
                title : '确定离开么?',
                ok : '去意已决',
                cancel : '再想想'
            }
            if(this.orderData.ispay == 'false'){
                this.showTip = true;
            }else{
                this.$router.go(-1)
            }
        },
        cancel(){
            this.showTip = false;
        },
        confirm(){
            if(this.tipText.type == 'back'){
                this.$router.go(-1)
            }else{
                // 删除订单
                http.post('delorder',{
                    id:this.orderData._id
                }).then((res) => {
                    if(res.status){
                        this.$router.push({name:'myorder'})
                    }
                })
            }
        },
        delOrder(){
            this.tipText = {
                type : 'del',
                title : '确定取消么?',
                ok : '确定',
                cancel : '再想想'
            }
            this.showTip = true;
        },
        inputDown(val) {
            
        //模拟检查数据
            setTimeout(() => {
            if (val == '123456') {
                http.post('alterorder',{
                    id:this.orderData._id,
                    ispay:'true'
                }).then((res) => {
                    if(res.status){
                        this.orderData.ispay = 'true';
                        this.$router.push({name:'myorder'})
                        this.$refs.pay.$payStatus(true)
                    }
                })
            } else {
                console.log(777);
                this.$refs.pay.$payStatus(false)
            }
            }, 500)
        },
      showPayPop() {
        this.payPopOptions.isShow = true;
      }
    },
    mounted(){
        let orderNum = this.$route.params.orderNum;
        console.log(orderNum);
        let username = window.localStorage.getItem('username')
        http.post('getorder',{
            username:username,
            ordernumber:orderNum
        }).then((res) => {
            if(res.status){
                this.orderData = res.data[0]
                this.concat = JSON.parse(this.orderData.address)
                console.log(this.orderData); 
            }else{
                this.$router.push({name:'index'})
            }
            
        })
        
    }
}
</script>
