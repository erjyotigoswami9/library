const mongoose = require("mongoose") ;

const bookSchema = mongoose.Schema({
    name : {type: String , required: true},
    author : {type:String, required: true} ,
    price : {type: Number , required: true},
    publication : {type:String, required: true},
    username : {type:String, required:true},
    userId : {type:String, required:true}
},{
    versionKey : false,
    timestamps : true  
}) ;

const BookModel = mongoose.model("books",bookSchema);   // collection-name and then schema name

module.exports = BookModel ;