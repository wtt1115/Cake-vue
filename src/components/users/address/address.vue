<template>
        <div id="site">
            <div class="Stop">
                <ul class="StopUl">
                    <li><router-link to="/users"><i class="fa fa-chevron-left"></i></router-link></li>
                    <li></li>
                    <li><i class="fa fa-shopping-cart"></i></li>
                </ul>
            </div>
            <div class="Smain">
                <div class="kong" v-show="false">
                    <img src="//themes/wap/img/address-empty.png">
                </div>
                <div class="have">
                    <ul>
                        <li v-for="(item,idx) in address">
                            <div class="hid">
                                <h4>
                                    {{item.receiver}}
                                    <span>{{item.recephone}}</span>
                                </h4>
                                <div class="Dsite">
                                    <span v-if="item.moren == 'true'">[默认地址]</span>
                                    {{item.address}}({{item.minute}})
                                </div>
                                <i class="fa fa-pencil-square-o" aria-hidden="true" @click="upsite(item)"></i>
                                <em @click="delsite(item)">删除</em>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="pop">
                {{text}}
            </div>
            <div class="Sfoot">
                <button @click="Xsite()">添加新地址</button>
            </div>
        </div>
        
</template>
<script>
    
    import './address.scss'
    import router from '../../../router/router'
    import http from '../../../utils/httpclient.js'

    export default{
        data(){
            return {
                address:[],
                text:''
            }
        },
        components: {
        },
        methods:{
            Xsite(){
                router.push({name:'addsite'});
            },
            upsite(item){
                this.$router.push({name:'addsite',query:{_id:item._id}})
            },
            delsite(item){
                let _id = item._id
                http.post('delsite',{_id}).then((res) =>{
                    if(res.status){
                        $('.pop').show().delay(2000).hide(0);
                        this.text = '删除成功';

                        let username = window.localStorage.getItem('username');

                        http.post('getaddress',{username}).then((res) =>{
                        
                            this.address = res.data

                        })
                    }
                })
            }
        },
        mounted(){
            
            let username = window.localStorage.getItem('username');

            http.post('getaddress',{username}).then((res) =>{
            
                this.address = res.data

            })
        }
        ,
        beforeRouteEnter (to, from, next) {
            // 在导航完成前获取数据
            console.log(from.path);
            next()
            
        }
       
    }
    
</script>