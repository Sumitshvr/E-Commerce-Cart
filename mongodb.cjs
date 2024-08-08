require('dotenv').config();
const mongoose=require('mongoose');
mongoose.connect(process.env.MONGOdb_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>
{
    console.log("connected Successfully");
})
.catch(()=>
{
    console.log("Error in connecting mongodb");
})

const schema =new mongoose.Schema({
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    email:{type:String,required:true},
    username:{type:String,required:true},
    number:{type:Number,required:true},
    enter_pass:{type:String},
    conf_pass:{type:String}
});

const collection=new mongoose.model("db",schema);
module.exports=collection;