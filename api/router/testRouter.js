import express from "express";


const router=express.Router();

router.post("/createData/",(req,res)=>{

    const email=req.body.email;
    const pwd=req.body.password;

    // const sendData= await fetch("")

    res.status("200").json({
        "email":email,
        "password":pwd
    });
});


export default  router ;