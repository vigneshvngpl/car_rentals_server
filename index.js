
//express import

const express=require("express")

//import logic

const logic=require("./service/logic")

//importing cors

const cors=require("cors")

//import json webtoken



//app creation

const app=express()



// integrating front end with server

app.use(cors({origin:"http://localhost:4200"}))

app.use(express.json())



//port set

app.listen(3000,()=>{
    console.log("port by vignesh started working in 3000");
})

//register

app.post("/register",(req,res)=>{
    logic.register(req.body.email,req.body.nme,req.body.phone,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//login

app.post("/login",(req,res)=>{
    logic.login(req.body.email,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

