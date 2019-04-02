const {Router} = require ('express');
const router = Router();//实例化router
const userModel = require('../model/user')//引入数据表模型 //
// 注册接口
router.post('/',async (req,res,next)=>{
try {
    const {
        username,
        password,
        avart,
        phone,
        // desc,
    } = req.body;
    if (username && password && password.length >= 8) {
        let user = await userModel.findOne({username})
        if(!user){
            const data = await userModel.create({ username, password, phone, avart });
            req.session.user = data;
            console.log(req.session)
            res.json({
                code: 200,
                msg:'注册成功',
                data
            }) 
        }else{
            res.json({
                code:400,
                msg:'该用户已经注册'
            })
        }
       
    }else{
        res.json({
            code:400,
            msg:'缺少必要参数'
        })
    }
   
} catch (error) {
     next(error)
}
})
//登录接口
router.post('/login',async (req,res,next)=>{
    try {
        let {username,password} = req.body
        
        if(username&&password){
            let user = await userModel.findOne({ username })
            if(user){
                if (password == user.password) {
                  res.json({
                    code: 200,
                    msg: "登录成功",
                    // data: user 密码不可见
                    data: {
                      username: user.username,
                      desc: user.desc,
                      phone: user.phone,
                      avart:user.avart//还没写连接
                    }
                  });
                } else {
                  res.json({
                    code: 400,
                    msg: "密码错误"
                  });
                }
            }else{
                res.json({
                    code: 400,
                    msg:'请先注册'
                })
              

            }
        }else{
            res.json({
                code:400,
                msg:'请输入必要信息'
            })
        }
    } catch (error) {
        next(error)
    }
})
module.exports = router