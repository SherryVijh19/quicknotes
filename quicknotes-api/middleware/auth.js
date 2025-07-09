const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    const token=req.header('Authorization');
    if(!token)return res.status(401).send('No Token');
    try{
        req.user=jwt.verify(token,process.env.JWT_SECRET).user;
        next();
    }
        catch{
            res.status(401).send('Invalid token');
        }
    };
