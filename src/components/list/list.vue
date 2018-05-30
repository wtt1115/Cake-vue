<template>
    <div class="f-list">
        <header class="list-header">
            <ul class="header-ul">
                <li @click="toSearch">
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </li>
                <li>
                    <span>{{this.title}}</span>
                </li>
                <li @click="toSearch()">
                    <i class="fa fa-search fdj" aria-hidden="true"></i>
                </li>
            </ul>
        </header>
        <main class="list-main" v-if="productData.length > 0">
            <ul class="main-product" v-if="productData.length > 0">
                <li v-for="(obj,idx) in productData" :key="idx" v-if="obj.price" @click="toDetails(obj.product_id)">
                    <div class="product-img">
                        <img :src="obj.img_url"/>
                    </div>
                    <div class="product-info" >
                        <p class="info-en_name">{{obj.en_name}}</p>
                        <p class="info-name">{{obj.name}}</p>
                        <p class="info-price" >{{obj.price[0]}} <em class="info-spec"> 元/{{obj.spec[0]}}</em> </p>
                    </div>
                </li>
            </ul>
        </main>
        <div class="show-tips" v-if="showStatus">
            <div class="tipsImg">
                <img src='https://s1.mi.com/m/images/m/empty.png' />
            </div>
            <p>抱歉，暂时没有与<span>{{this.title}}</span>相关的商品 </p>
        </div>
    </div>
</template>
<script>
    import './list.scss';
    import http from '../../utils/httpclient.js';
    export default{
        data(){
            return {
                title:'',
                productData:[],
                // 显示状态:默认不存在
                showStatus : false
            }
        },
        mounted(){
            // 接收关键字
            let keyword = this.$route.query.keyWord;
            this.title = keyword;

            // 发起请求获取关键字的商品
            http.post('searchProduct',{keyword}).then(res=>{
                if(res.status){
                    this.productData = res.data;
                }else{
                    this.showStatus = true;
                }
            })
        },
        methods:{
            // 封一个跳转到详情页的函数
            toDetails(product_id){
                this.$router.push({name:'details',query:{product_id}});
            },
            // 封一个跳转到搜索页的函数
            toSearch(){
                this.$router.push('/search');
            }
        }
    }
</script>