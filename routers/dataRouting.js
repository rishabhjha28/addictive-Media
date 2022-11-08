const express = require("express");
const router = new express.Router();
const conn = require("../db/connection");
const multer = require("multer");
const Data = require('../model/dataModel')

var resconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads");
    },
    filename:(req,file,callback)=>{
        callback(null,`Resume-${Date.now()}${file.originalname}`)
    }
});

var upload = multer({
    storage:resconfig,
})

router.post('/',upload.single('resume'),(req,res)=>{
    console.log("fnskjn")
    const {filename} = req.file
    const {name,dob,country,time} = req.body
    const data = Data.build({name:name,dob:dob,country:country,fileLink:filename,time:time})  
    data.save().then(result=>{
        console.log("result",result)
        res.json({msg:"success"})
    }).catch(err=>{
        console.log("err",err)
        res.json({err:err})
    })
})

router.get('/',(req,res)=>{
    Data.findAll().then(response=>{
        res.json(response)
    }).catch(err=>{
        res.json({err:err})
    })
})

router.delete('/:id',(req,res)=>{
    const {id} =req.params 
    Data.destroy({
        where:{id:id}
    })
    .then(response=>{
        res.json(response)
    })
})

router.get('/getResume/:fileLink',(req,res)=>{
    const {fileLink} = req.params
    console.log(fileLink)
    res.download("./uploads/"+fileLink)
})


module.exports = router;