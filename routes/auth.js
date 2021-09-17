const router = require('express').Router()
const User = require("../app/models/user")
const {findMatch,isAdmin, isExist ,isUsernameExist} = require("../app/modules/validation")
const admins = ["admin123@gmail.com"]
const bcrpyt = require('bcrypt')
const passport = require("passport")
const isAuth = require('../app/middlewares/isAuth')


router.get('/login' , isAuth, (req , res)=>{
   res.render("auth/login")
})

//LOGIN | POST

router.post('/login' , passport.authenticate('local',  { successRedirect:"/dashboard", failureRedirect: '/auth/login' ,failureFlash:true }), (req , res,next)=>next())



router.get('/register' , isAuth, (req , res)=>{
   res.render("auth/register")
})

// CREATE USER || POST
router.post('/register' , async (req , res)=>{
    let errors=[];
   const {username,email,password,confirmPassword} = req.body
   let role = "user"
   if(!username || !email || !password || !confirmPassword){
       errors.push({error:"All fields are required !"})
   }
   if(!findMatch(password, confirmPassword)) {
       errors.push({error:"Password doesn't match with confirm Password"})
   }
   if(await isExist(email)){
        errors.push({error:"User with same email already exits"})
   }
   if(await isUsernameExist(username)){
        errors.push({error:"Username already taken"})
   }

   if(!errors.length==0){
       res.render("auth/register",{
         errors,
          username,
         password,
          email,
         confirmPassword
      })
      errors=[];
      return
   }

   if(isAdmin(email,admins)) role = "admin" 
   try{
      const hashedPassword = await bcrpyt.hash(password,10)
      await User({ username , email, password:hashedPassword  , role }).save()
      req.flash("success_msg","You are now registed")
      res.redirect('/auth/login')
   }catch(err){
      console.log(err)
   }
  
})


router.get('/logout' , (req , res)=>{
   req.logOut()
   req.flash("success_msg","You are Logout")
   res.redirect("/auth/login")
})



module.exports = router