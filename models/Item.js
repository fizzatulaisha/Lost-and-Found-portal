const mongoose=require("mongoose");
const itemSchema= new mongoose.Schema({

status:{
  type:String,
  enum:["Lost" ,"Found"],
  required:true
},
itemName:{
  type:String,
  required:true
},
category:{
  type:String,
  required:true
},
date:{
  type:String,
  required:true
},
loc:{
type:String,
required:true
},
des:{
  type:String,
  required:true
},
image:{
  type:String,
  required:true
},
phone:{
  type:String,
  required:true
},
note:{
  type:String,

},
owner:{
  type: mongoose.Schema.Types.ObjectId,
  ref:"User"
}

});
module.exports=mongoose.model("Item",itemSchema);