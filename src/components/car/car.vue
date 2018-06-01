<template>
    <div class="carBox">
        <div v-if="carlist.length >= 1" class="carContent">
            <div class="carTop">
                <span><i class="fa fa-angle-left" aria-hidden="true" @click="back"></i></span>
                <span>购物车</span>
                <span @click="toggleEdit" v-html="show == 'add-car' ? delHtml : '完成'"></span>
            </div>
            <div class="carCenter">
                <ul>
                    <li v-for=" (item,index) in carlist" :key="index">
                        <div class="goodsCon">
                            <div class="goodsImg">
                                <p class="labelContainer">
                                <label>
                                    <input type="checkbox" name="radioName" :id="item.carId" @change="chosen(item)" hidden :checked="show == 'add-car' ? chosenItem.indexOf(item.carId) > -1 : chosenDelItem.indexOf(item.carId) > -1 "/>
                                    <label :for="item.carId" class="radio-beauty"></label>
                                </label>
                                </p>
                                <img :src="item.img_url" />
                            </div>
                            <div class="goodsDet">
                                <h2>{{item.en_name}}</h2>
                                <span>{{item.name}}</span>
                                <span>{{item.spec}}</span>
                                <div>
                                    <p>￥{{item.price}}</p> <p v-if="show == 'add-car'">
                                        <span v-if="carlist[index].qty > 1" @click="sub(index)">-</span>
                                        <span v-else @click="delGoods($event,index)"><i class="fa fa-trash-o" aria-hidden="true"></i></span>
                                        <span @click="changQty(carlist[index].qty,index)">{{carlist[index].qty}}</span>
                                        <span @click="add(index)">+</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div v-if="item.tableware" class="package">
                            <p><img src="http://m.21cake.com/themes/wap/img/cart-laid.png"/><span>含免费餐具{{item.tableware}}套</span></p>
                        </div>
                    </li>
                </ul>
            <RecommendComponent :carlist="carlist"></RecommendComponent>
            </div>
            <div :is="show" :chosenItemLen="chosenItem.length" :carlistLen="carlist.length" :totalPrice="this.totalPrice" :chosenDelItemLen="chosenDelItem.length"></div>
        </div>
        <div v-else class="emptyCar">
            <div class="carTop">
                <span><i class="fa fa-angle-left" aria-hidden="true" @click="back"></i></span>
                <span>购物车</span>
                <span></span>
            </div>
            <div class="emptyCon">
                <img src="http://static.21cake.com/themes/wap/img/cart-empty.png"/>
                <p>您的购物车里还没有商品</p>
                <span>去购物 >></span>
            </div>
        </div>
            <!-- <RecommendComponent></RecommendComponent> -->
        <footComponent></footComponent>
        <div v-if="isEdit" class="changeQtyForCar">
            <div class="editCon">
                <h2>修改商品数量</h2>
                <p><span @click="sub(-1)">-</span><input type="text" v-model="currentQty"><span  @click="add(-1)">+</span></p>
                <div>
                    <span @click="cancelChangeQty">取消</span>
                    <span @click="confirm">确定</span>
                </div>
            </div>
        </div>
        <div v-if="isDel" class="delGoods">
            <div class="editCon">
                <h2>确定删除该商品?</h2>
                <div>
                    <span @click="cancelDel">取消</span>
                    <span @click="confirmDel">确定</span>
                </div>
            </div>
        </div>
    </div>
        
</template>

<script>
    
    import footComponent from '../foot/foot.vue'
    import RecommendComponent from './recommend.vue'
    import './car.scss'
    import http from '../../utils/httpclient.js';
    export default{
        components: {
           footComponent,
           RecommendComponent,
            'edit-car':{
                props:['chosenDelItemLen','carlistLen'],
                template:`<div class="carBottom">
                        <p class="labelContainer">
                            <label @change="this.$parent.checkAll">
                                <input type="checkbox" name="radioName" id="checkAll" hidden :checked="this.chosenDelItemLen == this.carlistLen"/>
                                <label for="checkAll" class="radio-beauty"></label>
                                <span>全选</span>
                            </label>
                        </p>
                        <p class="settlement"><span  @click="this.$parent.delGoods" :class="this.$parent.getAutoDel()">删除</span></p>
                    </div>`
           },
           'add-car':{
               props:['chosenItemLen','carlistLen','totalPrice'],
               template:`
                    <div class="carBottom">
                        <p class="labelContainer">
                            <label @change="this.$parent.checkAll">
                                <input type="checkbox" name="radioName" id="checkAll" hidden :checked="this.chosenItemLen == this.carlistLen"/>
                                <label for="checkAll" class="radio-beauty"></label>
                                <span>全选</span>
                            </label>
                        </p>
                        <p class="settlement">合计:<span class="total">￥{{this.totalPrice}}.00</span> <span :class="this.$parent.getAutoOrder()" @click="this.$parent.addOrders" >结算({{chosenItemLen}})</span></p>
                    </div>`
           },
          
           
        },
        methods:{
            // 添加商品数量
            add(idx){
                let username = window.localStorage.getItem('username');
                if(idx >= 0){
                   
                    if(username){
                        this.carlist[idx].qty++;
                        this.carlist[idx].type = "+"
                        console.log(this.carlist[idx]);
                        
                         // ajax
                         http.post('upProductqty',this.carlist[idx]).then(res=>{
                            console.log(res);
                            
                            if(res){
                                this.getTotalPrice();
                                this.$store.commit('updateCarLen',1);
                            }
                        })
                    }else{
                        this.$store.commit('addCar',this.carlist[idx]);
                        this.$store.commit('updateCarLen',1);
                    }
                }else{
                    this.currentQty++;
                }
            },
            // 减少商品数量
            sub(idx){
                if(idx  >= 0){
                    let username = window.localStorage.getItem('username');
                    this.carlist[idx].qty--;
                    if(username){

                        if(this.carlist[idx].qty < 1){
                            this.carlist[idx].qty = 1
                            return
                        }
                        this.carlist[idx].type = "-"
                         // ajax
                         http.post('upProductqty',this.carlist[idx]).then(res=>{
                            if(res){
                                this.getTotalPrice();
                                this.$store.commit('updateCarLen',-1);
                            }
                        })
                    }else{
                        this.$store.commit('addCar',this.carlist[idx]);
                        this.$store.commit('updateCarLen',-1);
                        this.getTotalPrice();
                    }
                    // ajax
                }else{
                    this.currentQty--;
                    if(this.currentQty <= 1){
                        this.currentQty = 1
                        return
                    }
                }

            },
            // 选中商品
            chosen(item){
                // 添加可加入订单
                if(this.show == 'add-car'){
                    if(this.chosenItem.indexOf(item.carId) < 0){
                    
                        this.chosenItem.push(item.carId)
                    }else{
                        this.chosenItem.splice(this.chosenItem.indexOf(item.carId),1)
                    }
                    this.getTotalPrice();
                // 添加可删除
                }else if(this.show == 'edit-car'){
                   
                    if(this.chosenDelItem.indexOf(item.carId) < 0){
                    
                        this.chosenDelItem.push(item.carId)
                    }else{
                        this.chosenDelItem.splice(this.chosenDelItem.indexOf(item.carId),1)
                    }

                }
            },
            // 全选(订单/删除)
            checkAll(){
               // 添加id到订单对应的数组
                if(this.show == 'add-car'){
                    if(this.carlist.length == this.chosenItem.length){
                        this.chosenItem = []
                    
                    }else{
                        this.chosenItem = []
                        this.carlist.forEach(item => {
                            if(this.chosenItem.indexOf(item.carId) < 0){
                                this.chosenItem.push(item.carId)
                            }
                        });
                    }
                    this.getTotalPrice();
                // 添加id到删除对应的数组
                }else if(this.show == 'edit-car'){
                    if(this.carlist.length == this.chosenDelItem.length){
                        this.chosenDelItem = []
                    }else{
                        this.chosenDelItem = []
                        this.carlist.forEach(item => {
                            if(this.chosenDelItem.indexOf(item.carId) < 0){
                                this.chosenDelItem.push(item.carId)
                            }
                        });
                    }

                }
                // console.log(this.chosenDelItem);
            },
            // 动态编辑(点击切换底部)
            toggleEdit(){
                this.show = this.show == 'edit-car' ? 'add-car' : 'edit-car'
            },
            // 显示修改商品数量弹窗(获取当前商品数量与carlist中对应的索引)
            changQty(qty,idx){
                this.isEdit = true;
                this.currentQty = qty;
                this.currentIdx = idx;
            },
            // 取消修改
            cancelChangeQty(){
                this.isEdit = false;
            },
            // 确认修改
            confirm(){
                
                if(this.currentQty == '' || !(typeof(this.currentQty) == 'number')){
                    return;
                }
                let count = this.currentQty - this.carlist[this.currentIdx].qty;
                this.carlist[this.currentIdx].type = "=";
                console.log(this.carlist[this.currentIdx]);
                this.carlist[this.currentIdx].qty = this.currentQty;
                http.post('upProductqty',this.carlist[this.currentIdx]).then(res=>{
                    console.log(res);
                    if(res){
                        this.$store.commit('updateCarLen',count);
                        this.getTotalPrice();
                        this.isEdit = false;
                    }
                })
            },
            // 获取总价
            getTotalPrice(){
                this.totalPrice = 0;
                this.carlist.forEach(item => {
                    if(this.chosenItem.indexOf(item.carId) > -1){
                        this.totalPrice += item.price * item.qty;
                    }
                })
            },
            // 点击显示删除确认弹窗
            delGoods(e,idx){
                if(!idx && idx != 0){
                    if(this.chosenDelItem.length <= 0){
                        return;
                    } 
                }else{
                    this.delIdx = idx;
                }
                this.isDel = true;

            },
            // 确认删除
            confirmDel(){
                if(this.delIdx == -1){
                    this.chosenDelItem.forEach(item => {
                        this.carlist.forEach((item_car,idx_car) => {
                            console.log(666);
                            if(this.chosenDelItem.indexOf(item_car.carId) > -1){

                                http.post('delProduct',this.carlist[idx_car]).then((res) => {
                                    if(res){
                                        this.carlist.splice(idx_car,1);
                                        this.$store.commit('updateCarLen',-1);
                                    }
                                })
                                
                            }
                        })
                    })
                }else{
                    console.log(this.carlist[this.delIdx]);
                    let count = this.carlist[this.delIdx].qty;
                    http.post('delProduct',this.carlist[this.delIdx]).then((res) => {
                        if(res){
                            this.carlist.splice(this.delIdx,1)
                            this.$store.commit('updateCarLen', -count);
                            this.delIdx = -1 ;
                        }
                    })
                }
                this.chosenDelItem = [];
                this.isDel = false;
            },
            // 取消删除
            cancelDel(){
                this.isDel = false;
                
            },
            // 添加订单
            addOrders(){
                if(this.chosenItem.length <= 0){
                    return;
                }
                let pushOrder = window.localStorage.getItem('pushOrder');
                
                pushOrder = [];
                this.carlist.forEach((item) => {
                    if(this.chosenItem.indexOf(item.carId) > -1){
                        pushOrder.push(item)
                    }
                })
                window.localStorage.setItem('pushOrder',JSON.stringify(pushOrder))
                this.$router.push({name:'confirmOrder'})
                // alert('添加订单');
                
            },
            // 是否高亮删除按钮(返回样式)
            getAutoDel(){
                return{
                    delEmpty : this.chosenDelItem.length <= 0 ,
                    delCar:this.chosenDelItem.length  >= 1
                }
            },
            // 是否高亮结算按钮
            getAutoOrder(){
                return{
                    noOrder : this.chosenItem.length <= 0 ,
                    gosale:this.chosenItem.length  >= 1
                }
            },
            // 返回
            back(){
                this.$router.go(-1)
            }
        },
        mounted(){

            let nativeCarlist = window.localStorage.getItem('nativeCarlist');
            
            let userName = window.localStorage.getItem('username')

            if(nativeCarlist == null || nativeCarlist == '') {
                nativeCarlist = [];
            }else{
                try{
                    nativeCarlist = JSON.parse(nativeCarlist)
                }catch(err){
                    nativeCarlist = [];
                }
            }
            if(!userName){
                this.carlist = nativeCarlist;
                this.carlist.forEach((item,idx) => {
                    item.carId = idx;
                })
            }else{
                
                http.post('getProductCar',{
                    username : userName
                    }).then((res) => {
                        if(res.status){
                            this.carlist = res.data
                            if(nativeCarlist.length >= 1){
                            
                                nativeCarlist.forEach((nativeItem,nativeIdx) => {
                                    let carQty = 0;
                                    let isHas = this.carlist.some((carItem,carIdx) => {
                                        carQty = carItem.qty;
                                        return carItem.product_id == nativeItem.product_id && carItem.spec == nativeItem.spec;
                                    })
                                    if(isHas){
                                        this.carlist.qty = carQty + nativeItem.qty;
                                    }else{
                                        this.carlist.push(nativeItem)
                                    }
                                })
                            }
                        }
                    this.carlist.forEach((item,idx) => {
                            item.carId = idx;
                    })
                })
            }
            this.getTotalPrice();
            // ajax
            
        },
        data(){
            return{
                // 是否显示删除标识
                show : 'add-car',
                // 选中可添加订单
                chosenItem : [],
                // 选中可删除
                chosenDelItem : [],
                // 选中当前商品的数量
                currentQty : 0,
                // 选中当前的商品索引
                currentIdx : 0,
                // 显示修改弹窗标识
                isEdit : false,
                // 显示删除弹窗标识
                isDel:false,
                // // 购物车是否为空标识
                delIdx : -1,
                // 选中商品总价
                totalPrice : 0,
                // 垃圾桶图标
                delHtml : `<i class="fa fa-trash" aria-hidden="true"></i>`,
                carlist : []
                
            }
        }
    }
    
    
</script>