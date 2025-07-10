const express=require('express');
const Note=require('../models/Note');
const auth=require('../middleware/auth');
const router=express.Router();

//create
router.post('/',auth,async(req,res)=>{
    const{title,content,tags}=req.body;
    const note=await Note.create({userId:req.user.id,title,content,tags});
    res.json(note);
})

//List,filter,paginate
router.get('/',auth,async(req,res)=>{
const {page=1,limit=10,tag}=req.query;
  const currentPage = parseInt(page) || 1;   // ✅ Define currentPage
  const perPage = parseInt(limit) || 10;     // ✅ Parse limit as number
 const query = { userId: req.user.id };
  if (tag) query.tags = tag;

  const total = await Note.countDocuments(query);
  const notes = await Note.find(query)
    .sort({ createdAt: -1 })
    .skip((currentPage - 1) * perPage)
    .limit(perPage);

  res.json({
    notes,
    totalPages: Math.ceil(total / perPage),
    currentPage,
  });
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