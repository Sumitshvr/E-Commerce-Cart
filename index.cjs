require('dotenv').config();
const express =require("express");
const bodyParser=require("body-parser");
const  collection =require("./mongodb.cjs");
const nodemailer=require('nodemailer');
const randomNumber=require('random-number');
const mongoose = require('mongoose');
const product=require('./products.json');

// console.log(product[0].image);
const app=express();
const port=   process.env.port || 5000;
const list=['egg',
'breaf','fjef'];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const generateOTP = () => {
    const options = {
      min: 1000,
      max: 9999,
      integer: true,
    };
  
    return randomNumber(options);
  };
  const otpStore = new Map();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host:'smtp.gamil.com',
    port:587,
    secure:true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });
  const otpPassword=(userEmail) => {
 const otp = generateOTP();
    otpStore.set(userEmail, otp.toString());
    const mailOptions = {
      from:{address: process.env.USER,
        name:"App Authentication"
    },
      to: userEmail,
      subject: 'OTP for Authentication',
      text: `Your OTP is: ${otp} `,
    };
    const sendMail=async(transporter,mailOptions)=>{
        try{
      await transporter.sendMail(mailOptions);
    console.log("Email has been sent !");
    }
    catch(error)
    {
       console.log(error);
    }
}
     console.log(otp);
    sendMail(transporter,mailOptions);
    
    }

    const sentPasscode=(userEmail,passcode)=>
    {
      const mailOptions = {
        from:{address: process.env.USER,
          name:"-------------Passcode-------------"
      },
        to: userEmail,
        subject: '⚡⚡⚡DONT SHARE ⚡⚡⚡',
        text: `Your Passcode is ${passcode} `,
      };
      const sendMail=async(transporter,mailOptions)=>{
        try{
      await transporter.sendMail(mailOptions);
    console.log("Passcode has been sent to !");
    }
    catch(error)
    {
       console.log(error);
    }
}
   
    sendMail(transporter,mailOptions);

    }


    app.post('/verifyOtp/:email', async (req, res) => {
         var enter_otp=req.body.otp;
        const email=req.params.email;
        console.log(email);
        const storedOTP = otpStore.get(email);
        console.log(storedOTP+"  "+enter_otp);
        if (storedOTP== enter_otp) {
          const user=await collection.findOne({email:email});
          sentPasscode(email,user.enter_pass);
          // res.send('OTP is valid!');
          // alert("Password has been sent to "+email);
          // toast("Passcode has been sent to "+email);
          res.render("login.ejs");
         
        } else {
          res.status(401).send('Invalid OTP');
        }
        // res.send("successfull ");
      });

app.post("/logout",(req,res)=>
{
  res.render("login.ejs");
})
app.post("/openOnlineStore",(req,res)=>{
  // const productlist=JSON.parse(product);
  res.render("online_store.ejs",{products:product});
})
app.get("/",(req,res)=>{
   
    showAlerts = false;

    res.render("login.ejs",{showAlerts});
});     
app.post("/login", async (req,res)=>{
    
    try{
    const check=await collection.findOne({email:req.body.Email});
    // console.log(check);
    // console.log(check.enter_pass == req.body.Password);
   
    if(check.enter_pass == req.body.Password)
    {
        // res.send("You have successfully login");
       console.log("login");
        res.render("index.ejs",{user:check.username});
    }
    else{
       res.render("login.ejs",{passwd:"inc",showAlerts:true})
    }
    
}
catch{
   
    res.render("login.ejs",{email:"inc",passwd:"inc",showAlerts:true})
}

});
app.post("/UpdateDetails/:email",async (req,res)=>{
    try{  
        const Email=req.params.email;
        console.log(Email+" "+req.params.email);
        const check=await collection.findOne({email:Email});
        console.log(req.body.new_pass+"  "+req.body.conf_new_pass+"  "+req.body.current_pass+"  "+check.enter_pass)
        if(check && req.body.new_pass===req.body.conf_new_pass && req.body.current_pass===check.enter_pass)
        {
           await  collection.updateOne({email:check.email,},{$set:{enter_pass:req.body.new_pass,conf_pass:req.body.conf_new_pass}})
           .then(()=>
           {
            console.log("Password Updated");
           })
           .catch(err => {
            console.log("Update operation error:", err)});
            // collection.close();
            console.log(check.enter_pass);
           
            res.render("login.ejs");
        }
        else{
            res.render("update.ejs");
        }


    }
    catch(err)
    {
            console.log(err);
    }
})

app.post('/processRequest',async(req,res)=>{
    const sel_action=req.body.action;
    const email=req.body.Email;
    console.log(sel_action);
    if(sel_action ==='knowPassword')
    {
        res.render("update.ejs",{email:email});
    }else if(sel_action === 'otp')
    {
        const userEmail =  req.body.Email; 
        const check=await collection.findOne({email:email});
        if(check)
        {
          otpPassword(userEmail);
          console.log(userEmail);
          res.render("otp.ejs",{email:userEmail});
        }
        else
        res.render("updateoptions.ejs");
       
      
    }
    else{
        res.send("error in post req");
    }
})
app.post("/Forgot",(req,res)=>
{
    res.render("updateoptions.ejs");
});
app.post("/Register",(req,res)=>{
   
    res.render("register.ejs");
});

app.post("/Registered",async (req,res)=>{
    const data={
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        username:req.body.username,
        number:req.body.number,
        enter_pass:req.body.enter_pass,
        conf_pass:req.body.conf_pass
    }
    console.log(data.enter_pass+" "+data.conf_pass);
    if(data.enter_pass===data.conf_pass){
    await collection.insertMany([data], { maxTimeMS: 15000 });
    res.render("login.ejs");
    }
    else
    {
      res.render("register.ejs");
    }
    
});
app.listen(port,()=>{
   console.log(`Server Running on port ${port}`);
});





