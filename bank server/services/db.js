//Server - mongodb Integration
//1 import mongoose

const mongoose = require('mongoose')

//2 state connection string via mangoose
mongoose.connect('mongodb://localhost:27017/BankServer',{
    useNewUrlParser:true //avoid unwanted warning
})

//3 Define Bank Model
const User=mongoose.model('User',{
    //model creation  -User
    //Scheme creation
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})

module.exports={
    User
}