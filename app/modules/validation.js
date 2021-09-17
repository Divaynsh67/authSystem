const User = require("../models/user")

const findMatch = (first,second)=>{
    if(first === second)  return true
    else return false
}
const isAdmin = (email,admins)=>{
    let isOr = false
  admins.forEach(admin => {
       if(admin===email){
         isOr = true
        }
   });
   return isOr
}
const isExist = async email=>{
    try {
        const result=  await User.exists({email})
        return result
        } catch (err) {
            console.log(err)
        }
}

const isUsernameExist= async username=>{
    try {
    const result=  await User.exists({username})
       return result
    } catch (err) {
        console.log(err)
    }
    
}


module.exports = {
    findMatch,
    isAdmin,
    isExist,
    isUsernameExist,
}