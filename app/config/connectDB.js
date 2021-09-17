function connectDB() {
    const mongoose = require('mongoose')
    mongoose.connect(process.env.MONGOOSE_URI  , { useNewUrlParser : true, useUnifiedTopology : true})
    .then((res)=>console.log('> DB Connected...'))
    .catch(err=>console.error(`> Error while connecting to mongoDB : ${err.message}`))
}
module.exports= connectDB;