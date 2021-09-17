module.exports = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.redirect("/")
        next()
        return
    }
    else{
        next()
    }
}