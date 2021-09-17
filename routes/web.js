const ensureAuth = require('../app/middlewares/ensureAuth')
const router = require('express').Router()
//unprotected routes
router.get('/' , (req , res)=>{
    if(req.isAuthenticated()){
       return res.redirect("/dashboard")
    }
    res.render("landing")
})
//all proctected routes
router.use(ensureAuth)

router.get('/dashboard' ,(req , res)=>{
    res.render("dashboard",{name:req.user.username})
})




module.exports  = router