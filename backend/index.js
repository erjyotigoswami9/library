const express = require("express") ;
const dotenv = require("dotenv") ;
const cors = require("cors") ;
const userRouter = require("./routes/user.route") ;
const connection = require("./config/db") ;
const bookRouter = require("./routes/book.route") ;

dotenv.config() ;

const server = express() ;

server.use(express.json()) ;
server.use(cors()) ;
server.use("/user",userRouter) ;
server.use("/book",bookRouter) ;

server.get("/data",(req,res)=>{
    return res.json({data : [{ "name" : "a1" }, {"name": "a2"},{"name":"a3"}]}) ;
})

const PORT = process.env.PORT || 3000 ;

server.listen(PORT , async ()=>{
    try {
        await connection ;
        console.log(`server is running at port no ${PORT} and db is also connected`) ;
    } catch (error) {
        console.log(error) ;
    }
})