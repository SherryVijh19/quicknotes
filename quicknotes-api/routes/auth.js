const express=require('express');
const jwt=require('jsonwebtoken');
const User=require('../models/User');
const router=express.Router();

router.post('/register',async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        let u=await User.findOne({email});
        if(u) return res.status(400).json({msg:'User exists'});
        u=new User({name,email,password});
        await u.save();
        const token=jwt.sign({user:{id:u.id}},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.json({token});
    }
    catch(e){
            res.status(500).send('Err');
        }
    });

    router.post('/login',async(req,res)=>{
        const{email,password}=req.body;
        try{
            const u= await User.findOne({email});
            if(!u)return res.status(400).json({msg:'Invalid'});
            const ok= await u.compare(password);
            if(!ok) return res.status(400).json({msg:'Invalid'});
            const token=jwt.sign({user:{id:u.id}},process.env.JWT_SECRET,{expiresIn:'7d'});
            res.json({token});
        }
        catch(e){
            res.status(500).send('Err');
        }
    });

    module.exports=router;