const mongoose=require('mongoose');
const NoteSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    title:String,
    content:String,
    tags:[String],
    createdAt:{type:Date,default:Date.now}
});
module.exports=mongoose.model('Note',NoteSchema);
