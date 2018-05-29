import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    carListLen : 0
}
const mutations = {
    addCar(state,_item){
        let item = Object.assign({},_item);
        // 本地购物车
        let nativeCarlist = window.localStorage.getItem('nativeCarlist');
        
        let hasUser = window.localStorage.getItem('user')

        if(!hasUser){
            if(nativeCarlist == null || nativeCarlist == '') {
                nativeCarlist = [];
                
            }else{
                try{
                    nativeCarlist = JSON.parse(nativeCarlist)
                }catch(err){
                    nativeCarlist = [];
                }
            }
            
            if(nativeCarlist.length <= 0){
                item.qty = 1;
                item.price = eval(item.price)[0];
                item.spec = eval(item.spec)[0];
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
                    item.price = eval(item.price)[0];
                    item.spec = eval(item.spec)[0];
                    nativeCarlist.push(item);
                }
            }
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

                    carlist.forEach((carItem,idx) => {
                        nativeCarlist.forEach((nativeItem,nativeIdx) => {
                            if(carItem.product_id == nativeItem.product_id && carItem.spec == nativeItem.spec){
                                // 更新qty到数据库 
                                let totalQty = carItem.qty + nativeItem.qty;
                            }else{
                                // 添加到数据库

                            }
                        })
                    })
                    // nativeCarlist = [];
                }else{
                    // 直接添加商品到数据库
                }
            }
        }

    },
    addCarListLen(){
        state.carListLen ++ ; 
    },
    subCarlistLen(){
        state.carListLen -- ;
    },
    setCarlistLen(state,len){
        state.carListLen = len ;
    }
}

const store = new Vuex.Store({
    state,
    mutations
})

export default store;