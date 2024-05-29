import express from "express";
const router=express.Router();


router.get('/getRecordReport', async (req, res) => {
    
    try {
        const fetch_data=await fetch(`https://creator.zoho.eu/api/v2/neyosportal/fleet-management/report/Fleet_Report`);
        const resData= await fetch_data.json();
        res.status(200).send(resData);
    }catch(err){
        console.log(err);
    }
});


exports.modules=router;