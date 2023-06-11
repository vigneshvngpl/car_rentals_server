
//express import

const express = require("express")

//import logic

const logic = require("./service/logic")

//importing cors

const cors = require("cors")

//import json webtoken



//app creation

const app = express()



// integrating front end with server

app.use(cors({ origin: "http://localhost:4200" }))

app.use(express.json())



//port set

app.listen(3000, () => {
    console.log("port by vignesh started working in 3000");
})

//register

app.post("/register", (req, res) => {
    logic.register(req.body.email, req.body.nme, req.body.phone, req.body.psw).then(result => {
        res.status(result.statusCode).json(result)
    })
})

//login

app.post("/login", (req, res) => {
    logic.login(req.body.email, req.body.psw).then(result => {
        res.status(result.statusCode).json(result)
    })



})


//view all vehicles
app.get("/viewall", (req, res) => {


    logic.viewallcars().then(result => {
        res.status(result.statusCode).json(result)
    })

})

//reserve car

app.get("/reserve/:id", (req, res) => {
    logic.getvehicle(req.params.id).then(data => {
        res.status(data.statusCode).json(data)
    })

})

//transaction api

app.get("/transactions/:id", (req, res) => {

    logic.transaction(req.params.id).then(data => {
        res.status(data.statusCode).json(data)
    })

})

//checkout Api

app.post("/checkout",(req,res)=>{

    logic.checkout(req.body.id,req.body.dates,req.body.email,req.body.fromdate,req.body.todate,req.body.totalprice,req.body.carname,req.body.carimage).then(data=>{
        res.status(data.statusCode).json(data)
    })
})

app.get("/checkdate",(req,res)=>{
    
})
