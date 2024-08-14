const mongoose = require("mongoose") ;
const dotenv = require("dotenv") ;

dotenv.config() ;

const MONGO_URL = process.env.MONGO_URL ;

const connection = mongoose.connect(`${MONGO_URL}/booksDB`) ;     //  db name 

module.exports = connection ;