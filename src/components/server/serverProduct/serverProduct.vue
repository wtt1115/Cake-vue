<template>
        <div>
            <!-- 搜索 -->
            <div class="w-sousuo">
                <input type="text" class="w-input" v-model="keyword"/>
                <input type="button" value="搜索" class="w-search" @click="searchs()"/>
                <input @click="add" class="w-search add" value="新增">
            </div>
            <!-- 表格 -->
            <table >
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>描述</th>
                        <th>价格</th>
                        <th>规格</th>
                        <th>图片</th>
                        <th>类型</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody >
                    <tr v-for="(obj,idx) in dataset">
                        <td>{{obj.name}}</td>
                        <td>{{obj.en_name}}</td>
                        <td>{{obj.price}}</td>
                        <td>{{obj.spec}}</td>
                        <td class="w-tupian">{{obj.img_url}}</td>
                        <td>{{obj.type}}</td>
                        <td>
                           
                            <span class="edit" @click="edit(obj)">编辑</span>
                            <span @click="deletelist(obj._id)" class="delete">删除</span>

                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- 编辑、删除 -->
            <div id="mask" v-if="editlist">
                <div class="mask">
                    <div class="title">
                        <span class="title-head">编辑</span>
                        <span @click="editlist=false" class="guanbi">
                            X
                        </span>
                    </div>
                    <div class="content">
                        <input type="text" v-model="editDetail.name" name="name" value="" placeholder="名称" /><br />
                        <input type="text" v-model="editDetail.en_name" name="en_name" value="" placeholder="描述" /><br />
                        <input type="text" v-model="editDetail.price" name="price" value="" placeholder="价格" /><br />
                        <input type="text" v-model="editDetail.spec" name="spec" value="" placeholder="规格" /><br />
                        <input type="text" v-model="editDetail.img_url" name="img_url" value="" placeholder="图片" /><br />
                        <input type="text" v-model="editDetail.type" name="type" value="" placeholder="类型" /><br />
                        <button @click="update" class="edit update" >更新</button>
                        <button @click="editlist=false" class="delete">取消</button>
                    </div>
                </div>
            </div>
            <!-- esc键提示 -->
            <div class="w-tuichu">
              <p>全屏可按ESC键退出</p>
            </div>
            <!-- 新增 -->
             
            <div id="mask1" v-if="editlist1">
                <div class="mask">
                    <div class="title">
                        <span class="title-head">新增</span>
                        <span @click="editlist1=false" class="guanbi">
                            X
                        </span>
                    </div>
                    <div class="content">
                        <input type="text" v-model="editDetail.name" name="name" value="" placeholder="名称" /><br />
                        <input type="text" v-model="editDetail.en_name" name="en_name" value="" placeholder="描述" /><br />
                        <input type="text" v-model="editDetail.price" name="price" value="" placeholder="价格" /><br />
                        <input type="text" v-model="editDetail.spec" name="spec" value="" placeholder="规格" /><br />
                        <input type="text" v-model="editDetail.img_url" name="img_url" value="" placeholder="图片" /><br />
                        <input type="text" v-model="editDetail.type" name="type" value="" placeholder="类型" /><br />
                        <button @click="update1" class="edit update" >更新</button>
                        <button @click="editlist1=false" class="delete">取消</button>
                    </div>
                </div>
            </div>
            <!-- 分页 -->
            <div class="w-paging" id="demoContent">
                <ul id="ul">
                    <li @click="allshow('1')">1</li>
                    <li @click="allshow('2')">2</li>
                    <li @click="allshow('3')">3</li>
                    <li @click="allshow('4')">4</li>
                    <li @click="allshow('5')">5</li>
                </ul>
            </div> 
        </div>
        
</template>
<script type="text/javascript">
import '../../css/server.css'
import http from '../../../utils/httpclient.js'
import $ from 'jquery'
import '../../libs/fenye/js/pagination.js'

    export default{
        data(){
            return {
                editlist: false,
                editlist1: false,
                editDetail: {},
                dataset:[],
                alldata:[],
                page1:[],
                page2:[],
                page3:[],
                page4:[],
                page5:[],
                keyword:''

            }
        },
         mounted(){
            http.post("getProduct",{}).then(res=>{
                this.dataset = res.data;
                this.alldata = res.data;
                //分页
                var dataArr = this.dataset;
               
                this.page1 = dataArr.slice(0,15);
                this.page2 = dataArr.slice(16,31);
                this.page3 = dataArr.slice(32,47);
                this.page4 = dataArr.slice(48,63);
                this.page5 = dataArr.slice(64,77);

                var ul = document.getElementById("ul");
                var li = ul.children;
                li[1].onclick = function(){

                }


            
            })
            

            
            
        },
        methods:{

            //删除
            deletelist(_id) {
                console.log(_id)
                // this.dataset.splice(i, 1);
                //这边可以传id给服务端进行删除 这个_id是从数据库传过来的，应用到此处
                http.post('delPro',{_id}).then((res) =>{
                       
                       if(res.status){
                            alert('删除成功')
                            http.post("getProduct",{}).then(res=>{
                                this.dataset = res.data;
                            })
                       }else{
                            alert('删除不成功')
                       }              
                })
            },
            //编辑
            edit(item) {
            //     console.log(item)
                this.editDetail = {
                    // id 任意定义    _id 数据库id
                    id:item._id,
                    name: item.name,
                    en_name: item.en_name,
                    price: item.price,
                    spec: item.spec,
                    img_url: item.img_url,
                    type: item.type,
                }
                this.editlist = true;
                

                
             },
             //新增
             add(){
                this.editDetail = {}
                this.editlist1 = true;
                
               
             },
             //新增确认更新
             update1(){
                
                http.post("addProduct",this.editDetail).then((res)=>{
                   
                     if(res.status){
                            alert('新增成功')
                            this.editlist1 = false;
                            http.post("getProduct",{}).then(res=>{
                                this.dataset = res.data;
                            })
                       }else{
                            alert('新增不成功')
                       }         
                });
                // $('#mask').hide()
                
             },
             //编辑确认更新
            update() {
                http.post("editpro",this.editDetail).then((res)=>{
                     if(res.status){
                            alert('修改成功')
                            this.editlist = false;
                            http.post("getProduct",{}).then(res=>{
                                this.dataset = res.data;
                            })
                       }else{
                            alert('修改不成功')
                       }         
                });
                
               
                
            },
            allshow(i){

                if(i == '1'){
                   this.dataset = this.page1;
                }else if(i == '2'){
                    this.dataset = this.page2;
                }else if(i == '3'){
                    this.dataset = this.page3;
                }else if(i == '4'){
                    this.dataset = this.page4;
                }else if(i == '5'){
                    this.dataset = this.page5;
                }
            },
            searchs(){
                if(this.keyword == ''){
                    alert('搜索框不能为空')
                }
                http.post('searchProduct',{keyword:this.keyword}).then((res)=>{
                    
                    if(res.status){
                        
                        this.dataset = res.data;
                    }
                })
            }
        }
    }
    
</script>