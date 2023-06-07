

const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/CarRental",{useNewUrlParser:true})

const User=mongoose.model("User",
{
  email:String,
  nme:String,
  phone:Number,
  psw:String,
  orders:Array
})

module.exports={
    User
}


//