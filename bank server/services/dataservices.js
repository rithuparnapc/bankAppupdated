//import jsonwebtoken

const jwt = require('jsonwebtoken');

//import db.js
const db=require('./db')



//userDetails={
    //1000:{acno:1000,username:'Seba', password:1000,balance:2000,transaction:[]},
    //1001:{acno:1001,username:'Manu', password:1001,balance:2000,transaction:[]},
    //1002:{acno:1002,username:'Fiza', password:1002,balance:2000,transaction:[]},
    //1003:{acno:1003,username:'Fabi', password:1003,balance:2000,transaction:[]},
  //}
   const signup=(acno,username,password)=>{
    //var userDetails=this.userDetails;
    //if(acno in userDetails){
      //this.saveDetails()
      return db.User.findOne({acno}).then(//asyncronous call
        user=>{
          if(user){
            return{
              status:false,
        statusCode:401,
        message:"User already exist"
            }
          }
          else{
            const  newUser = new db.User({
              acno:acno,
        username:username,
        password:password,
        balance:0,
        transaction:[]
            })
            newUser.save();
            return {
              status:true,
        statusCode:200,
        message:"Sign up Successful"
            }

          }
        }
        
   )}
   //else{
   // userDetails[acno]={
     // acno:acno,
     // username:username,
     // password:password,
     // balance:0,
     // transaction:[]
   /// }
   // return {
    //  status:true,
    //  statusCode:200,
    //  message:"Sign up Successful"
  //  }
 /// }
  
//}
    
    
   const login=(acno,password)=>{
    //if(acno in userDetails){
      //if(pswd==userDetails[acno]['password']){
        //currentUser=userDetails[acno]['username'];
        return db.User.findOne({acno,password}).then(
          user=>{
            if(user){
              currentUser=user.username;
              currentAcno=acno
              
               //token generation
        const token=jwt.sign({currentAcno:acno},'superkey2023')
        //superkey will generate a number eg frutyigkgmvnc3455
        return  {
          status:true,
          statusCode:200,
          message:"Login Successful",
          token:token,
          currentUser:user.username,
          currentAcno:acno
        }

            }
            else{
              return  {
                status:false,
                statusCode:401,
                message:"invailed Userdetails"
              }
            }
            
          }
        )
   }
        
        //token generation
       // const token=jwt.sign({currentAcno:acno},'superkey2023')
        //superkey will generate a number eg frutyigkgmvnc3455
       // return  {
       //   status:true,
       //   statusCode:200,
       //   message:"Login Successful",
       //   token:token
      //  }

     // }
      //else{
      //return  {
       // status:false,
       // statusCode:401,
       // message:"invailed password"
     // }
      ///}
      
   // }
    //else{
      //return {
       // status:false,
       // statusCode:401,
       // message:"invalid userdetails"
      //}

    //}
 // }
   const deposit=(acno,password,amt)=>{
    var amount=parseInt(amt)

    return db.User.findOne({acno,password}).then(
      user=>{
        if(user){
          
      if(password==user.password){
        user.balance +=amount;
        user.transaction.push({
          type:'Credit',
          amount
        })
        user.save();//save to mongodb
        return {
          status:true,
          statusCode:200,
          message:`${amount} is credited and balance is ${user.balance}`
        }
      }
      else{
        return  {
          status:false,
          statusCode:401,
        message:"incorrect password"
        }
  
      }
        }
      }
    )
   }
    //if(acno in userDetails){
      //if(pswd==userDetails[acno]['password']){
       // userDetails[acno]['balance'] +=amount;
       // userDetails[acno]['transaction'].push({
        //  type:'Credit',
        //  amount
       // })
       // return {
        //  status:true,
        //  statusCode:200,
        //  message:`${amount} is credited and balance is ${userDetails[acno]['balance']}`
        //}
     // }//
     // else{
       // return  {
         // status:false,
          //statusCode:401,
        //message:"incorrect password"
        //}
  
      //}
    //}
    //else{
     // return {
       // status:false,
        //statusCode:401,
        ///message:"incorrect user details"
     // }

    //}

  //}

   const withdraw=(acno,password,amt)=>{
    var amount=parseInt(amt)
    return db.User.findOne({acno,password}).then(
      user=>{
        if(user){
          
      if(password==user.password){
        if(user.balance>amount){
          user.balance -=amount;
            user.transaction.push({
              type:'Debit',
              amount
        })
        user.save();
        return {
          status:true,
          statusCode:200,
          message:`${amount} is debited and balance is ${user.balance}`
        }
        
        
        } 
      }
      else{
        
        return {
          status:false,
          statusCode:401,
          message:"incorrect password"
        }
      }
    }
    else{
      return {
        status:false,
        statusCode:401,
        message:"incorrect user details"
      }
        }
      }
      )
    }
    //if(acno in userDetails){
     // if(pswd==userDetails[acno]['password']){
       // if(userDetails[acno]['balance']>amount){
        //  userDetails[acno]['balance'] -=amount;
         //   userDetails[acno]['transaction'].push({
         //     type:'Debit',
   //           amount
   //     })
   //     return {
   //       status:true,
   //       statusCode:200,
   //       message:`${amount} is debited and balance is ${userDetails[acno]['balance']}`
   //     }
   //     
        
    //    } 
    //  else{
        
     //   return {
      //    status:false,
      //    statusCode:401,
      //    message:"incorrect password"
     //   }
     // }
   // }
 //   else{
   //   return {
     //   status:false,
       // statusCode:401,
       // message:"incorrect user details"
  //    }
    //}

  //}
  const getTransaction=(acno)=>{
    return db.User.findOne({acno}).then(
      user=>{
        if(user){
          return {
            status:true,
            statusCode:200,
            transaction:user.transaction
          }

        }
        else{
          return{
            status:false,
            statusCode:401,
            message:"User not found"
          }
        }
      }
    ) 
  }

  //delete account
  const deleteAcc=(acno)=>{
  return db.User.deleteOne({acno}).then(
    user=>{
      if(user){
        return {
          status:true,
          statusCode:200,
          message:"User deleted"
        }}
        else{
          return{
            status:false,
            statusCode:401,
            message:"User not found"
          }
        }
        
      }
  )
    }
  
  
    
  module.exports={
    signup,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc
  }