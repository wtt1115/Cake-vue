// 操作用户登陆注册的模块
const db = require('../api/db');
const apiResult = require('../api/apiResult');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;

// 判断用户是否已登陆
let filter = function(req,res,next){
    // 获取前端的token
    let token = req.headers['auth'];
    if(!token){
        res.send(apiResult(false,{},'unauth'));
    }else{
        jwt.verify(token,'1234',(error,result)=>{
            if(error){
                res.send(apiResult(false,{},'unauth'));
            }else{
                next();
            }
        })
    }
}
module.exports = {
    account(app){
        // 注册
        app.post('/register',async (req,res)=>{
            // 获取用户数据
            let username = req.body.username;
            let password = req.body.password;

            // 保存个人信息的昵称,生日,性别
            let nickname = '';
            let gender ='';
            let birthday ='';
            

            // 调用数据库模块
            // 注册之前先查询用户名是否存在
            let result = await db.select('user',{username});
            if(result.status){
                res.send(apiResult(false));
            }else{
                let result = await db.insert('user',{username,password,nickname,gender,birthday});
                console.log(result)
                res.send(result);
            }
        });

        // 登陆
        app.post('/login',async (req,res)=>{
            // 获取用户名
            let username = req.body.username;
            let password = req.body.password;
            
            let result = await db.select('user',{username,password});

            // 如果用户存在则设置token
            if(result.status){
                let token = jwt.sign({username},'1234',{
                    'expiresIn':60*60
                })
                let ar = apiResult(result.status,{token,username});
                res.send(ar);
            }else{
                res.send(result);
            }
        });
        // 删除
        app.post('/remove',async (req,res)=>{
            // 获取用户信息
            let username = req.body.username;
            let password = req.body.password;

            // 调用数据库模块
            let result = await db.delete('user',{username,password});
            res.send(result);
        });
        // 修改信息 这里是收货地址的
        app.post('/update',async (req,res)=>{
            // 获取用户信息
            let username = req.body.username;
            let password = req.body.password;
            let newpassword = req.body.newpassword;

            let type = req.body.type;

            // 获取要修改的数据
            let receiver = req.body.receiver;
            let address = req.body.address;
            let recephone = req.body.recephone;
            let minute = req.body.minute;

            let nickname = req.body.nickname || '';
            let gender =req.body.gender || '';
            let birthday =req.body.birthday || '';

            //先查询用户名是否存在
            let resultname = await db.select('user',{username})

            //当用户名存在时执行
            if(resultname.status){
                //修改生日信息
                if(type == 'birthday'){
                    let result = await db.update('user',{username},{nickname,gender,birthday})

                    if(result.status){
                        res.send(apiResult(true))
                    } else {
                        
                        res.send(apiResult(false));
                    }
                } else if(type == 'password'){
                    let result = await db.select('user',{username,password})

                    if(password != result.data[0].password){
                        res.send(apiResult(false))
                    } else {

                        let resultpad = await db.update('user',{username,password},{password:newpassword})

                        if(resultpad.status){
                            res.send(apiResult(true));
                        } else {
                            res.send(apiResult(false));
                        }
                    }
                }
                else {
                    //修改收货地址
                    let result = await db.update('usersite',{username},{receiver,address,recephone,minute})

                    if(result.status){
                        res.send(apiResult(true));
                    } else {
                        
                        res.send(apiResult(false));
                    }
                }
            } else {
                //用户不存在时返回false
                
                res.send(apiResult(false))
            }

            

            
        }) ;
        // 获取所有用户
        app.get('/getuser',async (req,res)=>{
            // 调用数据库模块
           
            let result = await db.select('user');
            let totals = result.data.length;
            console.log(totals)
            res.send(apiResult(result.status,result.data,'',totals));
        });

        // //适用于一个用户一个表插入生日
        // app.post('/setbirthday',async (req,res)=>{
        //     let username = req.body.username;

        //     let nickname = req.body.nickname;
        //     let gender =req.body.gender;
        //     let birthday =req.body.birthday;
        //     console.log(nickname,gender,birthday)

        //     let result = await db.insert('user',{username,nickname,gender,birthday})
        //     if(result.status){
        //         res.send(apiResult(true))
        //     }else{
        //         res.send(apiResult(false))
        //     }
        // });

        // 获得生日
        app.post('/getbirthday',async (req,res)=>{
            let username = req.body.username;

            let result = await db.select('user',{username})
            if(result.status){
                res.send(apiResult(result.status,result.data))
            }
            else{
                res.send(apiResult(false))

            }
        });
        // 插入用户地址
        app.post('/setaddress',async (req,res)=>{
            let username = req.body.username;

            // 用户地址：
            // 收货人,手机号码，三级联动地址，详细地址，
            let receiver = req.body.receiver;
            let recephone = req.body.recephone;
            let address = req.body.address;
            let minute = req.body.minute;
            // 默认地址
            let moren = req.body.moren;

            if(moren == 'true'){

                let resultmo = await db.update('usersite',{username,moren:'true'},{moren:'false'})
            }
            let result = await db.insert('usersite',{username,receiver,recephone,address,minute,moren}) 
            if(result.status){
                res.send(apiResult(true));
            }else{
                res.send(apiResult(false))
            }
        });
        //删除地址
        app.post('/delsite',async (req,res) =>{
            let _id = req.body._id;

            let result = await db.delete('usersite',{_id:new ObjectId(_id)})

            if(result.status){
                res.send(apiResult(result.status))
            } else {
                res.send(apiResult(false));
            }
        });
        //修改用户地址
        app.post('/upsite',async (req,res) =>{
            let username = req.body.username;
            let _id = req.body._id;

            let receiver = req.body.receiver;
            let recephone = req.body.recephone;
            let address = req.body.address;
            let minute = req.body.minute;
            // 默认地址
            let moren = req.body.moren;

            if(moren == 'true'){

                let resultmo = await db.update('usersite',{username,moren:'true'},{moren:'false'});

                if(resultmo.status){
                    let result = await db.update('usersite',{_id:new ObjectId(_id)},{receiver,recephone,address,minute,moren})

                        if(result.status){
                            res.send(apiResult(true))
                        } else{
                            res.send(apiResult(false))
                        }

                } else {
                    res.send(apiResult(false))
                }

            } else {
                let result = await db.update('usersite',{_id:new ObjectId(_id)},{receiver,recephone,address,minute,moren})

                    if(result.status){
                        res.send(apiResult(true))
                    } else{
                        res.send(apiResult(false))
                    }
            }

            

        });
        // 获取用户地址
        app.post('/getaddress',async (req,res)=>{

            let _id = req.body._id
            let username = req.body.username;
            let type = req.body.type;

            if(_id){
                let result = await db.select('usersite',{_id:new ObjectId(_id)})

                if(result.status){
                    res.send(apiResult(true,result.data))
                } else {
                    res.send(apiResult(false));
                }
            } else if(type == 'default'){
                let result = await db.select('usersite',{username:username,moren:'true'})

                if(result.status){
                    res.send(apiResult(result.status,result.data))
                } else {
           
                    res.send(apiResult(false))
                }

            } else {
                
                let result = await db.select('usersite',{username})
                // console.log(result)
                if(result.status){
                    res.send(apiResult(result.status,result.data))
                }else{
                    res.send(apiResult(false))
                }
            }

        });



        // 获取用户登陆状态
        app.post('/getStatus', filter,(req,res)=>{
            res.send(apiResult(true));
        })
    }
    
}