<template>
    <div>
        <!-- 编辑商品 -->
        <div class="mask" v-show="show">
             <div class="form" >
                <h2>编辑商品</h2>
                <div class="form-group">
                    <label for="product_id">product_id:</label>
                    <input type="text" class="form-control" id="product_id" name="product_id">
                </div>
                <div class="form-group">
                    <label for="name">name:</label>
                    <input type="text" class="form-control" id="name" name="name">
                </div>
                <div class="form-group">
                    <label for="en_name">en_name:</label>
                    <input type="text" class="form-control" id="en_name" name="en_name">
                </div>
                
                 <div class="form-group">
                    <label for="price">price:</label>
                    <input type="text" class="form-control" id="price" name="price">
                </div>
                <div class="form-group">
                    <label for="spec">spec:</label>
                    <input type="text" class="form-control" id="spec" name="spec">
                </div>
               <div class="form-group">
                    <label for="img_url">img_url:</label>
                    <input type="file"  id="img_url" name="img_url" class="img_url">
                </div>
                 <div class="form-group">
                    <label for="type">type:</label>
                    <input type="text" class="form-control" id="type" name="type">
                </div>

                
                <button type="submit" class="btn btn-default btn-success" id="btn_save" @click="btn_save">保存</button>
                <button type="submit" class="btn btn-default btn_close btn-success" @click="close">取消</button>
            </div>
        </div>
        <!-- 刷新事件 -->
        <div class="refresh">
            <button class="btn btn-success" @click="btn_refresh">刷新</button>
        </div>

        <table class="table table-striped table-bordered table-hover">
            <thead class="tableTitle" id="tableTitle">
                <tr>
                    <th v-for="(col,idx) in config1.cols">{{col}}</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj,idx) in dataset">
                    <td v-for="(col,idx) in config1.cols" :key="idx">{{obj[col]}}</td>
                    <td>
                        <button class="btn btn-danger  btn-default btn-sm" @click="btn_del(obj.product_id)">
                            删除
                        </button>
                        <button class="btn btn-success btn-sm" @click="btn_edit(obj)">编辑</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/javascript">
    import http from '../../../utils/httpclient.js';
    import './yangshi.css'

    export default {
        props:['config1'],
        data(){
            return {
                dataset:[],
                show:false,
                // 编辑字段
                product_id:'',
                name:'',
                en_name:'',
                price:'',
                spec:'',
                img_url:'',
                type:'',
               

            }
        },
        mounted(){
            http.post(this.config1.url).then(res=>{
                this.dataset = res.data.data;
            });

        },
        methods:{
            // 删除事件
            btn_del(id){
                var r = confirm('删除该商品吗？');
                if (r==true){
                    http.post('delproduct',{id}).then(res=>{
                        // console.log(res);
                        if(res.status){
                            http.get(this.config1.url).then(res=>{
                                this.dataset = res.data.data;
                            })                       
                        }
                    })
                }else{
                  // alert("!");
                  return;
                }
            },
            // 编辑事件
            btn_edit(obj){
                this.show = true;
                this.product_id = obj.product_id;
                this.name = obj.name;
                this.en_name = obj.en_name;
                this.price = obj.price;
                this.spec = obj.spec;
                this.type = obj.type;
            },
            // 保存数据
            btn_save(){
                var product_id = this.product_id;
                var changeObj = {
                    product_id:this.product_id,
                    name:this.name,
                    en_name:this.en_name,
                    price:this.price,
                    spec:this.spec,
                    type:this.type
                }
                // 将数据发给后端进行修改
                http.post('updateproduct',changeObj).then(res=>{
                    // console.log(res)
                    if(res.status){
                        this.show = false;
                        alert('修改成功！');
                        // 重新刷新
                        http.get(this.config1.url).then(res=>{
                            this.dataset = res.data.data;
                        })
                    }else{
                        alert('修改失败！')
                    }
                })
            },
            // 关闭弹窗
            btn_cacel(){
                this.show = false;
            },
            // 刷新
            btn_refresh(){
                http.get(this.config1.url).then(res=>{
                    alert('刷新成功！');
                    this.dataset = res.data.data;
                }) 
            }
        }
    }
</script>