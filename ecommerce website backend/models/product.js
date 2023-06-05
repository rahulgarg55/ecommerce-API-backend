const mongoose=require('mongoose');
var prodschema=new mongoose.Schema({
    name:String,
    image:String,
    price:Number
})
module.exports=mongoose.model("Product",prodschema);


//Body-parser is used to require daata from forms and currently loaded page.