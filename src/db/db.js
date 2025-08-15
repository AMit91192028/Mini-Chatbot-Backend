const mongoose = require('mongoose');
function connectToDB(){
    mongoose.connect(process.env.MONGODB).then(()=>{
        console.log("connect to DB")
    })
    .catch((err)=>{
        console.log("Error in db connection",err);
    })
}
module.exports =  connectToDB