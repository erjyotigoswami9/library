const jwt = require("jsonwebtoken") ;
const dotenv = require("dotenv") ;
const UserModel = require("../model/user.model") ;
dotenv.config() ;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ;

const auth = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1] ;    // bearer token 
        jwt.verify(token, JWT_SECRET_KEY , async(err,decoded)=>{
            if(err){
                // console.log(err);
                res.status(404).send({"msg":"invalid token"}) ;
            }else{
                // console.log("decoded is ",decoded) ;
                req.user = decoded ;
                req.body.username = decoded.username ;
                let data = await UserModel.findOne({email: decoded.email}) ;
                if(data!=null){
                    req.body.userId = decoded.userId ;
                    req.body.role = data.role ;
                    next() ;
                }else{
                    res.status(404).send({"msg":"user not exist in database"}) ;
                }
            }
        })
    } catch (error) {
        // console.log(error) ;
        res.status(404).send({"msg":"error occurred while verifying user"}) ;
    }
}

module.exports = auth ;