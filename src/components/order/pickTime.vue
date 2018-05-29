<template>
    <div class="pickMark">
        <div class="pickCon">
            <h2>选择收货时间</h2>
            <div>
                <div class="swiper-container-time">
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide" v-for="(item,index) in dateArr" :key="index">
                            {{item}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .pickMark{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.267);
        display: flex;
        z-index: 100;
    }
    .pickCon{
        width: 85%;
        height: 40%;
        background-color: #fff;
        margin: auto auto; 
        border-radius: 5px;
    }
    .pickCon h2{
        font-size: 23px;
        padding: 10px;
    }
</style>
<script>
import '../../../node_modules/swiper/dist/css/swiper.css';
import Swiper from 'swiper'
export default {
    data(){
        return{
            weekArr : [],
            dateArr : []
        }
    },
    mounted(){
            var timeSwiper = new Swiper('.swiper-container-timer',{
                direction:'vertical',
                slidesPerView:3,
                auto:true,
                loop:true
            })
        let  date = new Date(Date.now());
        let week = ['周日','周一','周二','周三','周四','周五','周六'];

        for (let i = 1; i <= 7; i++) {
            let dateStr = '';
            date.setDate(date.getDate() + 1);
            let m = date.getMonth() + 1;
            let d = date.getDate();
            let w = week[date.getDay()]; 
            dateStr += m + '-' + d + ' ' + w;
            this.dateArr.push(dateStr)
        }
        for(let i = 9; i < 21; i ++){
            let timeArr = '';
            timeArr += (String(i).length > 1 ? i + ': 00 - ' : '0' + i + (': 00 - ')) + (String(i).length > 1 ? i + ': 30' : '0' + i +(': 30'));
            this.weekArr.push(timeArr)
        }
    }
}
</script>


