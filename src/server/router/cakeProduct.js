const db = require('../api/db.js')
const apiResult = require('../api/apiResult.js')
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    edit(app){
        //插入商品
        app.post('/addProduct',async (req,res) =>{  
            console.log(req.body)

            let img_url = req.body.img_url;           
            let name = req.body.name;
            let en_name = req.body.en_name;
            let spec = req.body.spec;
            let price = req.body.price;
            let type = req.body.type;

            let result = await db.insert('productCar',{img_url,name,en_name,price,spec,type})
                    console.log(result)
                    if(result.status){
                        res.send(apiResult(true))
                    } else {
                        res.send(apiResult(false))
                    }

        });
        //删除后台页面商品
        app.post('/delPro',async (req,res)=>{

            let _id = req.body._id;

            let result = await db.delete('productsCake',{_id:new ObjectId(_id)})
            if(result.status){
                 res.send(apiResult(true))
            }else{
                res.sed(apiResult(false))
            }
           
        });
         //修改后台页面商品
        app.post('/editpro',async (req,res)=>{
            let id = req.body.id;
            let name = req.body.name;
            let en_name =req.body.en_name;
            let price =req.body.price;
            let spec = req.body.spec;
            let img_url = req.body.img_url;
            let type = req.body.type;

            let result = await db.update('productsCake',{_id:new ObjectId(id)},{name,en_name,price,spec,img_url,type})
            if(result.status){
                res.send(apiResult(true))
            }else{
                res.send(apiResult(false))
            }
        });

        //有id获取详情页的，没有id则获取全部商品
        app.post('/getProduct',async (req,res) =>{
            if(req.body.id && !req.body.type){
                let product_id = req.body.id;
                // product_id = Number(product_id);id是string类型就不用这个转义
                // console.log(product_id)

                let result = await db.select('productsCake',{product_id});
                res.send(result)

            } else if(req.body.type && req.body.id) {
                let result = await db.select('productsCake',{type:req.body.type});
                // 是否获取到数据
                if(result.status){
                    let data = result.data[0].data;
                    let arr = [];
                    for(var i=0;i<data.length;i++){
                        if(data[i].product_id == req.body.id){
                            arr.push(data[i]);
                        }
                    }
                    if(arr.length > 0){
                        res.send(apiResult(true,arr));
                    }else{
                        res.send(apiResult(false,arr));
                    }
                }else{
                    res.send(apiResult(false));
                }
                
            }else{
                
                let result = await db.select('productsCake');
                // console.log(result.data)
                let totals = result.data.length;
                res.send(apiResult(result.status,result.data,'',totals));

            }
            
        });
        //获取定位地址
        app.post('/city',async (req,res)=>{
            let city = req.body.city;
            let result = await db.select('productsCake',{city});
            res.send(result);
        })
        //获取Car商品
        app.post('/getProductCar', async (req,res) =>{

            let username = req.body.username;

            let result = await db.select('productCar',{username});

            res.send(result);
        })
        //删除商品
        app.post('/delProduct',async (req,res) =>{
            let product_id = req.body.product_id;
            let username = req.body.username;
            let spec = req.body.spec;
            product_id = Number(product_id);

            let result = await db.delete('productCar',{username,product_id,spec});

            res.send(result);
        });
        //修改商品
        app.post('/upProduct',async (req,res) =>{

            let product_id = Number(req.body.product_id);
            let img_url = req.body.img_url;
            let product_brief = req.body.product_brief;
            let product_name = req.body.product_name;
            let product_price = req.body.product_price;
            let type_text = req.body.type_text;

            console.log(product_id,img_url,product_brief,product_name,product_price,type_text)

            let result = await db.update('productsCake',{product_id},{img_url,product_brief,product_name,product_price,type_text})

            res.send(result);
        })

        //修改商品qty   
        app.post('/upProductqty',async (req,res) =>{

            let username = req.body.username;

            let product_id = Number(req.body.product_id);
            let spec = req.body.spec;


            let type = req.body.type || '';
            
            let resultuser = await db.select('productCar',{username})
            console.log(resultuser)
            let qty;

            if(resultuser.status){

                resultuser.data.map(async (item) =>{
              
                    if(item.product_id == product_id && item.spec == spec){

                        if(type == "+"){
                            qty = Number(item.qty) + 1;
                            spec = item.spec;
                            let result = await db.update('productCar',{username,product_id,spec},{qty})

                            res.send(result.status);

                        } else if(type == "-"){
                            qty = Number(item.qty) - 1;

                            let result = await db.update('productCar',{username,product_id,spec},{qty})
                            res.send(result.status);

                        }else if(type == "="){
                            qty = Number(item.qty);
                            let result = await db.update('productCar',{username,product_id,spec},{qty})
                            console.log(result)
                            res.send(result.status);
                        }
                        
                    }
                })
                
            } else {

                res.send(false);
            }

        });
        //添加商品加入购物车
        app.post('/addProductCar',async (req,res) =>{

            let username = req.body.username;

            let product_id = Number(req.body.product_id);
            let img_url = req.body.img_url;
            let img_url1 = req.body.img_url1;

            let name = req.body.name;
            let en_name = req.body.en_name;
            let spec = req.body.spec;
            let price = req.body.price;
            let qty = Number(req.body.qty);

            let result_id = await db.select('productCar',{username,product_id,spec});
            if(result_id.status){
                let dataQty = result_id.data[0].qty;
                dataQty = dataQty+ qty;
                // console.log(dataQty,qty);
                console.log(username,product_id,spec);
             

                let result = await db.update('productCar',{username,product_id,spec},{qty:dataQty});
                console.log(result)
                if(result.status){
                    res.send(true);
                }else{
                    res.send(false);
                }
            }else{
                // spec和id不相同
                let result = await db.insert('productCar',{username,product_id,img_url,img_url1,name,en_name,price,spec,qty})
                    console.log(result)
                    if(result.status){
                        res.send(result.status)
                    } else {
                        res.send(apiResult(false,result))
                    }
            }


        });

        // 商品模糊查询
        app.post('/searchProduct',async (req,res)=>{

            // 获取关键字
            let keyword  = req.body.keyword;
           
            let reg = new RegExp(keyword,'i');
            // 调用数据库模块
            let result = await db.search('productsCake',reg);
            res.send(result);
        });
        // 生成订单
        app.post('/addorder',async (req,res) =>{

            let username = req.body.username;

            let ispay = req.body.ispay;

            console.log(JSON.parse(req.body.products))
            let products = JSON.parse(req.body.products);

            let time = '';

            let totalprice = req.body.totalprice;

            let address = req.body.address;

            let totalnums = req.body.totalnums;

            let taketime = req.body.taketime;
            let ordernumber = req.body.ordernumber;

            console.log(ispay,totalprice,totalnums,taketime);

            if(username){
                
                let d = new Date();

                let year = d.getFullYear();
                let month = d.getMonth()+1;
                let day = d.getDate();

                let h = d.getHours();
                let m = d.getMinutes();
                let s = d.getSeconds();

                h = h>10? h : '0' + h
                m = m>10? m : '0' + m
                s = s>10? s : '0' + s

                time = year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s

            }

            let result = await db.insert('order',{username,ordernumber,ispay,time,totalprice,totalnums,address,taketime,products});
            console.log(result)

            if(result.status){
                res.send(apiResult(true))
            } else {
                res.send(apiResult(false))
            }
  
        });
        //获取订单
        app.post('/getorder',async (req,res) =>{

            let username = req.body.username;
            let ordernumber = req.body.ordernumber;
            let result;
            if(ordernumber == undefined){
                result = await db.select('order',{username});

            }else{
                result = await db.select('order',{username,ordernumber});
            }


            if(result.status){
                res.send(result)
            } else {
                res.send(apiResult(false))
            }
        });
        //删除订单
        app.post('/delorder',async (req,res) =>{

            let id = req.body.id;

            let result = await db.delete('order',{_id:new ObjectId(id)})
            
            res.send(apiResult(true));

        });
        //修改订单
        app.post('/alterorder',async (req,res) =>{

            let ispay = req.body.ispay;
            // 订单的id
            let id = req.body.id;

            if(ispay == 'false'){

                ispay = 'true'

            }
            // new ObjectId(id) 数据库的实例化id
            let result = await db.update('order',{_id:new ObjectId(id)},{ispay})

            res.send(apiResult(true));
        })
    }
}