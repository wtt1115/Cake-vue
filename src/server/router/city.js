// 管理员登陆模块
const db = require('../api/db');
const apiResult = require('../api/apiResult');

// 暴露模块
module.exports = {
    choose(app){
        app.post('/city',async (req,res)=>{
            let city = req.body.city;
            let result = await db.select('city',{city});
            res.send(result);
        })
    }
}