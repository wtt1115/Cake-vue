import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils/httpclient'
Vue.use(Vuex)
const state = {
    carListLen : 0
}
const mutations = {
    addCar(state,_item){
        // console.log(_item);
        
        let item = Object.assign({},_item);
        if(typeof(item.price) == 'string'){
            item.spec = item.spec;
            item.price = item.price;
        }else{
            item.spec = item.spec[0];
            item.price = item.price[0];
        }
        
        // 本地购物车
        let nativeCarlist = window.localStorage.getItem('nativeCarlist');
        
        let userName = window.localStorage.getItem('userName')

        if(!userName){
            if(nativeCarlist == null || nativeCarlist == '') {
                nativeCarlist = [];
            }else{
                try{
                    nativeCarlist = JSON.parse(nativeCarlist)
                }catch(err){
                    nativeCarlist = [];
                }
            }
            // state.carListLen = nativeCarlist.length;
            if(nativeCarlist.length <= 0){
                item.qty = 1;
                item.price = item.price;
                item.spec = item.spec;
                nativeCarlist.push(item);
            }else{
                let hasIdx;
                let isHas = nativeCarlist.some((goods,idx) => {
                    hasIdx = idx
                    // console.log(goods.product_id,item.product_id,item.spec,goods.spec);
                    return item.product_id == goods.product_id && item.spec == goods.spec;
                });
                if(isHas){
                    nativeCarlist[hasIdx].qty ++;
                }else{
                    item.qty = 1;
                    item.spec = item.spec;
                    item.price = item.price;
                    nativeCarlist.push(item);
                }
            }
            let totalQty = 0;
            nativeCarlist.forEach(item => {
                totalQty += item.qty;
            })
            // state.carListLen = totalQty;
            window.localStorage.setItem('nativeCarlist',JSON.stringify(nativeCarlist))
        }else{
            if(nativeCarlist !=null && nativeCarlist != ''){
                try{
                    nativeCarlist = JSON.parse(nativeCarlist);
                }catch(err){
                    nativeCarlist = [];
                }
                if(nativeCarlist.length > 1){
                    // 获取购物车的数据
                    // ajax
                    let carlist;
                    let totalQty = 0;

                    carlist.forEach((carItem,idx) => {
                        nativeCarlist.forEach((nativeItem,nativeIdx) => {
                            if(carItem.product_id == nativeItem.product_id && carItem.spec == nativeItem.spec){
                                // 更新qty到数据库 
                                let bothQty = carItem.qty + nativeItem.qty;
                                totalQty += bothQty;
                            }else{
                                // 添加到数据库
                            }
                        })
                    })
                    // state.carListLen = totalQty;
                    // nativeCarlist = [];
                }else{
                    // 直接添加商品到数据库
                }
            }
        }

    },
    // 封一个获取用户购物车总数量的函数
    getCarQty(state){
        // 判断用户是否已经登陆
        let userName = window.localStorage.getItem('userName');
        if(userName){
            http.post('',{}).then(res=>{
                console.log(res);
                if(res.status){
                }
            })
        }else{
            // 获取本地存储的商品数量
            let nativeCarlist = window.localStorage.getItem('nativeCarlist');
            nativeCarlist = JSON.parse(nativeCarlist) || [];
            let defaultQty = 0;
            for(var i=0;i<nativeCarlist.length;i++){
                defaultQty += Number(nativeCarlist[i].qty);
            }
            // state.carListLen = defaultQty;
        }
    },
    setCarlistLen(state){
        // 本地购物车
        let nativeCarlist = window.localStorage.getItem('nativeCarlist');

        let userName = window.localStorage.getItem('userName')
        // userName = 'admin'
        if(!userName){
            if(nativeCarlist == null || nativeCarlist == '') {
                nativeCarlist = [];
            }else{
                try{
                    nativeCarlist = JSON.parse(nativeCarlist)
                }catch(err){
                    nativeCarlist = [];
                }
            }
            let totalQty = 0;
            nativeCarlist.forEach(item => {
                totalQty += item.qty;
            })
            
            state.carListLen = totalQty;
        }else{
            if(nativeCarlist !=null && nativeCarlist != ''){
                try{
                    nativeCarlist = JSON.parse(nativeCarlist);
                }catch(err){
                    nativeCarlist = [];
                }
                if(nativeCarlist.length >= 1){
                    // 获取购物车的数据
                    // ajax
                    let carlist;
                    http.post('getProductCar',{
                        username : userName
                    }).then((res) => {
                       
                        if(res.status){
                           carlist = res.data
                           console.log(carlist);
                           let totalQty = 0;
                       
                           carlist.forEach((carItem,idx) => {
                               nativeCarlist.forEach((nativeItem,nativeIdx) => {
                                   if(carItem.product_id == nativeItem.product_id && carItem.spec == nativeItem.spec){
                                       // 更新qty到数据库 
                                       let bothQty = carItem.qty + nativeItem.qty;
                                       totalQty += bothQty;
                                   }else{
                                       // 添加到数据库
                                   }
                               })
                           })
                           state.carListLen = totalQty;
                           window.localStorage.removeItem('nativeCarlist')
                        }
                    })
                }else{
                    //
                }
            }else{
               let carlist ;
                http.post('getProductCar',{
                    username : userName
                }).then((res) => {
                  
                    if(res.status){
                       carlist = res.data
                       let totalQty = 0;
                       carlist.forEach((item) => {
                        totalQty += item.qty;
                       })
                       state.carListLen = totalQty;
                       
                    }
                })
            }
        }
    },
    updateCarLen(state,qty){
        state.carListLen += qty;
    }
}

const store = new Vuex.Store({
    state,
    mutations
})

export default store;