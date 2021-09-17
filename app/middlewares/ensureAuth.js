module.exports = (req , res , next)=>{
    if(req.isAuthenticated()){
        next()
    }
    else{
        req.flash("error_msg","Please Login to view resource")
        res.redirect("/")
    }

}

