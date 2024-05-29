
import fetch from "node-fetch";
import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import morgan from "morgan";
import { fileURLToPath } from 'url';
import path from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour encoder les données en URL
const encodeFormData = (data) => {
    return Object.keys(data).map(key => 
      encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
    ).join('&');
};


/***
 * FUNCTION AUTHORIZATION REQUEST....
 */
function make_authorization_request(client_id="",scope=[],redirect_uri="",access_type="offline"){

    if(client_id.length>0){
        if(scope.length>0){      
            const scope_=scope;//Je sépare les valeurs de mon scope et je met 
            if(redirect_uri.length>0){
                 //Code here...
                 const url =`https://accounts.zoho.eu/oauth/v2/auth?response_type=code&client_id=${client_id}&scope=${scope_}&redirect_uri=${redirect_uri}&access_type=${access_type}`;
                 return url;
                } 
        }else{
            console.log("Scope is empty or is not a array");
        }
    }
}

/***
 * FUNCTION ACCESS TOKEN....
 */
async function get_access_token(client_id="",client_secret="",redirect_uri="",code=""){

    if(client_id.length>0 && client_secret.length>0){
        if(code.length>0){       
            if(redirect_uri.length>0){
                 //Code here...
                //  const url =`https://accounts.zoho.eu/oauth/v2/token?grant_type=authorization_code&client_id=${client_id}>&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${code}`;
                //  return url;

                    const dataRequest={
                      "code":code,
                      "redirect_uri":redirect_uri,
                      "client_id":client_id,
                      "client_secret":client_secret,
                      "grant_type":"authorization_code"   
                    };

                    

                    try {
                        const dataResponse= await fetch (`https://accounts.zoho.eu/oauth/v2/token`,{
                            method:"POST",
                            headers:{
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                            body:encodeFormData(dataRequest),
                            
                        });

                        const response= await dataResponse.json();

                        return response;

                    }catch(err){
                        console.error("There is a problem...");
                    }

                } 
        }else{
            console.log("code is empty or is not a array");
        }
    }
}

;
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use(morgan("dev"));
// // Create an instance of Axios for making HTTP requests.
// const axiosInstance = axios.create();

const client_id=process.env.CLIENT_ID;
const client_secret=process.env.CLIENT_SECRET;
const redirect_uri=process.env.REDIRECT_URI;
const domain_api_url=process.env.ZOHO_NEYOS_DOMAIN_ACCOUNT;
const PORT=process.env.PORT||3000;


/****AUTHORIZATION REQUEST API */

app.get('/authorization-request', (req, res) => {

    const scope=["ZohoCRM.settings.modules.ALL"];

     const generate_auth_token=make_authorization_request(client_id,scope,redirect_uri);
     res.render("authorization-token",{generate_auth_token});
});



app.get('/authorization-request/:scope', (req, res) => {

    const scope=req.params.scope;
    const generate_auth_token=make_authorization_request(client_id,scope,redirect_uri);
    res.render("scope",{generate_auth_token});
});


app.get('/access-token/:code', async (req, res) => {

    const code=req.params.code;
    try {
        const generate_auth_token=await get_access_token(client_id,client_secret,redirect_uri,code);
        res.render("token",{generate_auth_token});
    }catch(err){
        res.status(500).send(err);
    }
    
});

app.get('/custom-authorization-request',(req,res)=>{
    const generate_auth_token="";
    res.render("form-authorization-token",{generate_auth_token});
});



app.get('/', (req, res) => {
     res.render("index");
});

/******TEST Router */

app.post("/createData/",(req,res)=>{

    const email=req.body.email;
    const pwd=req.body.password;

    // const sendData= await fetch("")

    res.status("200").json({
        "email":email,
        "password":pwd
    });
});





app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});