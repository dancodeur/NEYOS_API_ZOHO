import express from "express";


const router=express.Router();

const Fakedata=[
    {"id":1, name:"Jean Dupont", email: "jean.dupont@example.com"},
    {"id":2, name:"Marie Curie", email:"marie.curie@example.com"},
    {"id":2, name:"Albert Einstein", email:"albert.einstein@example.com"}
];

/******TEST Router */

router.get('/', (req, res) => {
     res.render("index");
});

router.post("/createData/",(req,res)=>{

    // const email=req.body.email;
    // const pwd=req.body.password;

    // res.status("200").json({
    //     "email":email,
    //     "password":pwd
    // });

    const data=req.body;

    res.status(200).json(data.data);
    
});


router.put("/UpdateData/",(req,res)=>{

    // const email=req.body.email;
    // const pwd=req.body.password;

    // res.status("200").json({
    //     "email":email,
    //     "password":pwd
    // });

    const data=req.body;

    res.status(200).json({
        "message":"requette success !!!",
        "data":data.data
    });
    
});

router.get("/getData/",(req,res)=>{
      
    res.status(200).send(Fakedata);
});




