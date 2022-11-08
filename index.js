const dotenv  = require('dotenv')
dotenv.config({path:'./config.env'})
const express = require('express')
const app = express()
const cors = require('cors')
const dataRouter = require('./routers/dataRouting')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use("/uploads",express.static("./uploads"))
app.use('/data',dataRouter)

app.get('/',(req,res)=>{
    res.json({name:'mfklasmlf'})
})

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const port = process.env.PORT
app.listen(port,()=>{
    console.log("Server started successfully on port",port)
})