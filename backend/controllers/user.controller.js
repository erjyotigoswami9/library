
const UserModel = require("../model/user.model") ;
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;
const dotenv = require("dotenv") ;
dotenv.config() ;

const register = async(req,res)=>{
    try {
        let user = req.body ;
        if(user.email && user.password && user.username){
            bcrypt.hash(user.password,3,(err,hash)=>{
                if(err){
                    // console.log(err) ;
                    res.status(404).send({"msg":"error occurred while hashing password"}) ;
                }else{
                    let data = new UserModel({email:user.email, password: hash, username : user.username , role: user.role }) ;
                    data.save() ;
                    // console.log(data) ;
                    res.status(200).send({"msg":"you have registered successfully"}) ;
                }
            })
        }else{
            res.status(404).send({"msg":"incorrect information for registering..."}) ;
        }
    } catch (error) {
        // console.log(error);
        res.status(404).send({"msg": "error occurred while registering"}) ;
    }
}

const login = async(req,res)=>{
    try {
        let user = req.body ;
        if(user.email && user.password){
            let data = await UserModel.findOne({email: user.email}) ;
            // console.log("data is ",data) ;
            if(data!=null){
                bcrypt.compare(user.password, data.password, (err,result)=>{
                    if(err){
                        // console.log(err);
                        res.status(404).send({"msg":"error occurred while checking password"}) ;
                    }else{
                        if(result){
                            const access_token = jwt.sign({email: data.email, username: data.username , role : data.role, userId : data._id }, process.env.JWT_SECRET_KEY ) ;
                            // const refresh_token =
                            res.status(200).send({"token":access_token}) ;  
                        }
                        else{
                            res.status(404).send({"msg":"wrong password"})
                        }
                    }
                })
            }else{
                res.status(404).send({"msg":"user not found with this email, write correct email"}) ;
            }
        }
        else{
            res.status(404).send({"msg":"enter complete necessary information"}) ;
        }
    } catch (error) {
        // console.log(error) ;
        res.status(404).send({"msg":"error occurred while login"}) ;
    }
}

module.exports ={register , login } ;