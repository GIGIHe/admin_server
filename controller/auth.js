module.exports = function(req,res,next) {
    if(req.session && req.session.user){
      next()
    }else{
        return {
            msg:'用户状态失效'
        }
    }
}