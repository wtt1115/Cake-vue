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
                            <i>x 2</i>
                        </div>
                    </div>
                </li>
            </ul>
            <p class="orderTotalPrice_c"><i>未支付:</i><span>28.00</span></p>
        </div>
    </div>
</template>

<script>
import './orderDet.scss'
export default {
    methods:{
        back(){
            this.$router.go(-1)
        }
    }
}
</script>
