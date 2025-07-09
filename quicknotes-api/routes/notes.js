const express=require('express');
const Note=require('../models/Note');
const auth=require('../middleware/auth');
const router=express.Router();

//create

//List,filter,paginate
router.get('/',auth,async(req,res)=>{
const {page=1,limit=10,tag}=req.query;
const q={userId:req.user.id};
if(tag)q.tags=tag;
const total=await Note.countDocuments(q);
const notes=awiat Note.find(q)
 
});



//get by id
router.get('/:id',auth,async(req,res)=>{
    const n=await Note.findOne({_id:req.params.id,userId:req.user.id});
        if(!n) return res.status(404).send('Not Found');
    res.json(n);
});

//update
router.put('/:id',async(req,res)=>{
    const n= await Note.findOneAndUpdate(
        {_id:req.params.id,userId:req.user.id},req.body,{new:true}
    );
        if(!n)return res.status(404).send('Not Found');
        res.json(n); 
});

//delete
router.delete('/:id',auth,async(req,res)=>{
    await Note.findOneAndDelete({_id:req.params.id,userId:req.user.id});
    res.json({msg:'Deleted'});
})

module.exports=router;