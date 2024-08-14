const express = require("express") ;
const auth = require("../middleware/auth.middleware") ;
const {creator, view , dele, viewall, edit, bookTypeOldNew } = require("../controllers/book.controller") ;
const {creator_check, viewer_check } = require("../middleware/userType.middleware") ;


const bookRouter = express.Router() ;

bookRouter.post("/create", [auth, creator_check] , creator) ;

bookRouter.get("/view", [auth, viewer_check], view) ;

bookRouter.delete("/delete/:bookId", [auth, creator_check] , dele) ;

bookRouter.patch("/edit/:bookId", [auth, creator_check] , edit) ;

bookRouter.get("/viewall", viewall) ;

bookRouter.get("/books",bookTypeOldNew)  ;

module.exports = bookRouter ;