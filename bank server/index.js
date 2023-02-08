//server creation

//1 Import express
const express=require('express')

//import jsonwebtoken
const jwt = require('jsonwebtoken');

//omport cors
const cors = require('cors')

const dataServices = require('./services/dataservices')

//2 Create an app using express
const app= express()
app.use(express.json())
//give command to share data via cors
app.use(cors({
    origin:'http://localhost:4200'
}))

//3 Create a port number
app.listen(3000,()=>{
    console.log('listening on port 3000');
})

//Application specific middleware
const appMiddleware =(req,res,next)=>{
    console.log('Application specific middleware');
    next();
}
app.use(appMiddleware)

//Router specific middleware
const jwtRouterMiddleware = (req,res,next)=>{
    try{
    console.log('Router specific middleware');
    //const token=req.body.token;
    const token=req.headers['x-access-token']
    const data=jwt.verify(token,'superkey2023')
    console.log(data);
    next();
}
catch{
    res.status(422).json({
        statusCode:422,//422 - unprocessable entity
        status:false,
        message:"Please login first"
    })
}
}
//4  Resolving http request
//app.post('/singup',(req,res)=>{
   // dataServices.signup(req.body.acno,req.body.username,req.body.password).then(
   //     result=>{
   //         res.status(result.statusCode).json(result)
   //     }
  //  )
    
//})
//app.post('/',(req,res)=>{
    //res.send('post http request')
//})
//app.put('/',(req,res)=>{
    ////res.send('put http request')
//})
//app.patch('/',(req,res)=>{
    //res.send('patch http request')
/////})
//app.delete('/',(req,res)=>{
    //res.send('delete http request')
//})

//API REQUEST
//signup request
app.post('/signup',(req,res)=>{
    dataServices.signup(req.body.acno,req.body.username,req.body.password).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
    
    //if(result){
    //res.send('signup successful')}
    //else{
      //  res.send('signup failed')
    //}
    //console.log(req.body);
})
//login request
app.post('/login',(req,res)=>{
    const result=dataServices.login(req.body.acno,req.body.password).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
    
})
//Deposit request
app.post('/deposit',jwtRouterMiddleware,(req,res)=>{
    const result=dataServices.deposit(req.body.acno,req.body.password,req.body.amt).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
    
})

//Withdraw request
app.post('/withdraw',jwtRouterMiddleware,(req,res)=>{
    const result=dataServices.withdraw(req.body.acno,req.body.password,req.body.amt).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
    
})

//Transaction request
app.post('/transaction',jwtRouterMiddleware,(req,res)=>{
    const result=dataServices.getTransaction(req.body.acno).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
    
})
//delete request
app.delete('/deleteAcc/:acno',(req,res)=>{
    dataServices.deleteAcc(req.params.acno).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
})

