const jwt=require("jsonwebtoken")

const verifyToken=(req,res,next) => {
    const authHeader=req.headers.authorization.split(" ")[1];
    if(authHeader){
        jwt.verify(authHeader,process.env.JWT_SEC,(err,user) =>{
            if(err)
                return res.send("Token is not valid").status(403);
            req.user_id=user.id;
            next();
        });
    }
    else{
        return res.send("You are not authenticated").status(401);
    }
}

module.exports=verifyToken;