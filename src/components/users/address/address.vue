<template>
        <div id="site">
            <div class="Stop">
                <ul class="StopUl">
                    <li @click="skip()"><i class="fa fa-chevron-left"></i></li>
                    <li><img src="http://static.21cake.com/themes/wap/img/logo.png" /></li>
                    <li><router-link to="/search"><i class="fa fa-search fdj"></i></router-link></li>
                </ul>
            </div>
            <div class="Smain">
                <div class="kong" v-if = "address == undefined">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    <span>还未添加地址</span>
                </div>
                <div class="have">
                    <ul>
                        <li v-for="(item,idx) in address" @click="skipId(item._id)">
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
            <div class="popo">
                <span>确认要删除？</span>
                <em @click="end()">取消</em>
                <em @click="affirm()">确认</em>
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
                text:'删除成功',
                _id:''
            }
        },
        components: {
        },
        methods:{
            Xsite(){
                router.push({name:'addsite'});
            },
            upsite(item,e){
                e = e || event;
                e.stopPropagation();
                this.$router.push({name:'addsite',query:{_id:item._id}})
            },
            delsite(item,e){
                e = e || event;
                e.stopPropagation();
                this._id = item._id
                $('.popo').show();
            },
            end(){
                $('.popo').hide();
            },
            affirm(){
                if(this._id){

                    http.post('delsite',{_id:this._id}).then((res) =>{

                        if(res.status){
                            $('.pop').show().delay(500).hide(0);
                            this.text = '删除成功';

                            let username = window.localStorage.getItem('username');

                            http.post('getaddress',{username}).then((res) =>{
                            
                                this.address = res.data

                            })
                        }
                    });
                }

                $('.popo').hide();
            },
            skip(){
                this.$router.go(-1);
            },
            skipId(_id){
                this.$router.push({name:'confirmOrder',query:{_id}});
            }
        },
        mounted(){
            
            let username = window.localStorage.getItem('username');

            http.post('getaddress',{username}).then((res) =>{
                console.log(res.data)
                this.address = res.data

            })
        }
    }
    
</script>