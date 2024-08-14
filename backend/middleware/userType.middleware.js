const { view } = require("../controllers/book.controller");

const creator_check = async (req,res, next)=>{
    try {
        if(req.body.role.includes("creator")){
            next() ;
        }else{
            res.status(404).send({"msg":"you are not creator"}) ;
        }
    } catch (error) {
        // console.log(error) ;
        res.status(404).send({"msg":"usertype not matched"}) ;
    }
}

const viewer_check = async (req,res, next)=>{
    try {
        if(req.body.role.includes("viewer")||(req.body.role.includes("creator"))){
            next() ;
        }else{
            res.status(404).send({"msg":"you are not creator"}) ;
        }
    } catch (error) {
        // console.log(error) ;
        res.status(404).send({"msg":"usertype not matched"}) ;
    }
}

module.exports = { creator_check , viewer_check } ;