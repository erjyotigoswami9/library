const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
      email : {type: String, required: true},
      password : {type: String , required : true},
      username : {type:String, required: true},
      role : {type: Array }
}, { 
    versionKey: false 
});

const UserModel = mongoose.model("users",userSchema) ;    // collection-name and then schema name

module.exports = UserModel ;