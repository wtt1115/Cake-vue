<template>
    <div class="recommend-c">
        <h2>• 推荐商品 •</h2>
        <ul>
            <li v-for="(obj,idx) in recommendList" :key="idx">
                <img :src="obj.img_url">
                <p>{{obj.name}}</p>
                <p><span>￥{{obj.price[0]}}</span><span @click="addCar(obj,$event)"><i class="fa fa-cart-plus" aria-hidden="true"></i></span></p>
            </li>
        </ul>
    </div>
</template>
<script>
    import './recommend.scss'
    import http from '../../utils/httpclient.js';
    export default {
        data(){
            return{
                recommendList : []
            }
        },
        props:['carlist'],
        methods:{
            addCar(item,e){
              
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
                setTimeout(() =>{
                    let userName = window.localStorage.getItem('username');
                    // userName = 'admin'
                    let _item = Object.assign({},item);
                    _item.price = _item.price[0]
                    _item.spec = _item.spec[0]
                    _item.qty = 1;
                    _item.carId = this.carlist.length;
                    _item.username = userName
                    if(userName){
                        http.post('addProductCar',_item).then((res) => {
                        
                            if(res){  
                                let currentIdx;
                                let isHas = this.carlist.some((commend,cIdx) => {
                                   currentIdx = cIdx;
                                    return commend.product_id == _item.product_id && commend.spec == _item.spec;
                                })
                                if(isHas){
                                    this.carlist[currentIdx].qty ++ ;
                                }else{
                                    this.carlist.push(_item);

                                }
                                this.$store.commit('updateCarLen',1);
                            }
                        })
                    }else{
                        let currentIdx;
                        let isHas = this.carlist.some((commend,cIdx) => {
                            currentIdx = cIdx;
                            return commend.product_id == _item.product_id && commend.spec == _item.spec;
                        })
                        if(isHas){
                            this.carlist[currentIdx].qty ++ ;
                        }else{
                            this.carlist.push(_item);
                            this.$store.commit('addCar',item);   
                        }
                        this.$store.commit('updateCarLen',1); 

                    }
                    // 移除元素
                    $flyImg.remove();
                },1000);
                
            }
        },
        mounted(){
             http.post('getProduct',{}).then((res) => {
                 res.data.forEach(item => {
                    if(item.type == '小切块'){
                        this.recommendList.push(item)
                    }
                 });
                 
             })
        }
    }
</script>

