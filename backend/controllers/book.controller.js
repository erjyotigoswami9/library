const BookModel = require("../model/book.model") ;

const creator = (req,res)=>{
    try {
        let book = req.body ;
        let data = new BookModel({...book}) ;
        data.save() ;
        // console.log(data) ;
        res.status(200).send(data) ;
    } catch (error) {
        // console.log(error) ;
        res.status(404).send({"msg":"error occurred while creating book"}) ;
    }
}

const view = async(req,res)=>{
    try { 
      let userId = req.body.userId ;
      let data = await BookModel.find({userId}) ;
    //   console.log(data) ;
      if(data!=null){
          res.status(200).send(data) ;
      }
      else{
          res.status(202).send({"msg":"no book data found for this user"}) ;
      }
    } catch (error) {
    //   console.log(error) ;
      res.status(404).send({"msg":"error occurred in viewing books"}) ;
    }
}

const dele = async(req,res)=>{
    try {
        let userId = req.body.userId ;
        let bookId = req.params.bookId ;
        // console.log("book id ",bookId) ;
        let bookIdData = await BookModel.findOne({_id:bookId}) ;
        if(bookIdData.userId==userId){
           let data = await BookModel.findByIdAndDelete({_id:bookId}) ;
        //    console.log(data) ;
           res.status(200).send(data) ;
        }else{
            res.status(404).send({"msg":"userId not matches with created book's userId"}) ;
        }
    } catch (error) {
        // console.log(error) ;
        res.status(404).send({"msg":"error occurred in deleting book for user"}) ;
    }
}


const edit = async(req,res)=>{
    try {
        let userId = req.body.userId ;
        let bookId = req.params.bookId ;
        let data1 = req.body ;
        // console.log("book id ",bookId) ;
        let bookIdData = await BookModel.findOne({_id:bookId}) ;
        if(bookIdData.userId==userId){
           let data = await BookModel.findByIdAndUpdate({_id:bookId},{...data1}) ;
        //    console.log(data) ;
           res.status(200).send(data) ;
        }else{
            res.status(404).send({"msg":"userId not matches with created book's userId"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(404).send({"msg":"error occurred in updating book for user"}) ;
    }
}

const viewall = async (req,res)=>{
    try {
       let data = await BookModel.find() ;
    //    console.log(data) ;
       if(data!=null){
           res.status(200).send(data) ;
       }
       else{
           res.status(202).send({"msg":"book data is empty"}) ;
       }
    } catch (error) {
    //    console.log(error) ;
       res.status(404).send({"msg":"error occurred in viewing books"}) ;
    }
}

const bookTypeOldNew = async(req,res)=>{
    let {old,new1} = req.query ;
    // console.log(old,new1) ;
    if(old==1){   // after 10mins
        try {
            let data = await BookModel.aggregate([{ $project: { currentTime: new Date(), _id: 1, name: 1, author: 1, price: 1, publication: 1, username: 1, userId: 1, createdAt: 1, updatedAt: 1, dateCreated: { $substr: ["$createdAt", 0, 10] }, timeCreated: { $substr: ["$createdAt", 11, 8] } } }, { $project: { currentTime: 1, _id: 1, name: 1, author: 1, price: 1, publication: 1, username: 1, userId: 1, createdAt: 1, updatedAt: 1, dateCreated: 1, timeCreated: 1, todayDate: { $substr: ["$currentTime", 0, 10] }, todaysTime: { $substr: ["$currentTime", 11, 8] } } }, { $project: { _id: 1, name: 1, price: 1, author: 1, publication: 1, username: 1, createdAt: 1, updatedAt: 1, currentTime: 1, dateCreated: 1, timeCreated: 1, todayDate: 1, todaysTime: 1, todaysHours: { $substr: ["$todaysTime", 0, 2] }, todaysMins: { $substr: ["$todaysTime", 3, 2] }, createdHour: { $substr: ["$timeCreated", 0, 2] }, createdMins: { $substr: ["$timeCreated", 3, 2] }, createdDate1: {$substr:["$dateCreated",8,2]}, todaysDate1:{$substr:["$todayDate",8,2]} } }, { $project: { _id: 1, name: 1, price: 1, author: 1, publication: 1, username: 1, createdAt: 1, updatedAt: 1, currentTime: 1, dateCreated: 1, timeCreated: 1,createdDate1:{$toInt:"$createdDate1"}, todaysDate1:{$toInt:"$todaysDate1"}, todayDate: 1, todaysTime: 1, todaysHours: { $toInt: "$todaysHours" }, todaysMins: { $toInt: "$todaysMins" }, createdHour: { $toInt: "$createdHour" }, createdMins: { $toInt: "$createdMins" } } },{$project:{  _id:1,name:1,createdDate1:1,todaysdate1:1,price:1,author:1,publication:1,username:1,createdAt:1,updatedAt:1,currentTime:1,dateCreated:1,todaysDate1:1,timeCreated:1,todayDate:1,todaysTime:1, todaysHours:1,todaysMins:1, createdHour:1, createdDate1:1 , createdMins:1, totalCreatedMins:{$multiply:["$createdHour",60]}, totalCurrentMins:{$multiply:["$todaysHours",60]} } },{$project:{  _id:1,name:1,price:1,author:1,publication:1,username:1,createdDate1:1,todaysDate1:1,createdAt:1,updatedAt:1,currentTime:1,dateCreated:1,timeCreated:1,todayDate:1,todaysTime:1, todaysHours:1,todaysMins:1, createdHour:1, createdMins:1, totalCreatedMins:1, totalCurrentMins:1 , diff_mins:{$subtract:["$totalCurrentMins","$totalCreatedMins"]}, diff_days:{$subtract:["$todaysDate1","$createdDate1"]} }},{$match:{diff_mins:{$gte:10}}},{$match:{diff_days:{$gte:0}}}])
            // console.log(data) ;
            res.status(200).send(data) ;
        } catch (error) {
            // console.log(error) ;
           res.status(404).send({"msg":"error occurred in viewing books which created after 10min"}) ;
        }
    }
    if(new1==1){    // within 10mins
        try {
            let data = await BookModel.aggregate([{ $project: { currentTime: new Date(), _id: 1, name: 1, author: 1, price: 1, publication: 1, username: 1, userId: 1, createdAt: 1, updatedAt: 1, dateCreated: { $substr: ["$createdAt", 0, 10] }, timeCreated: { $substr: ["$createdAt", 11, 8] } } }, { $project: { currentTime: 1, _id: 1, name: 1, author: 1, price: 1, publication: 1, username: 1, userId: 1, createdAt: 1, updatedAt: 1, dateCreated: 1, timeCreated: 1, todayDate: { $substr: ["$currentTime", 0, 10] }, todaysTime: { $substr: ["$currentTime", 11, 8] } } }, { $project: { _id: 1, name: 1, price: 1, author: 1, publication: 1, username: 1, createdAt: 1, updatedAt: 1, currentTime: 1, dateCreated: 1, timeCreated: 1, todayDate: 1, todaysTime: 1, todaysHours: { $substr: ["$todaysTime", 0, 2] }, todaysMins: { $substr: ["$todaysTime", 3, 2] }, createdHour: { $substr: ["$timeCreated", 0, 2] }, createdMins: { $substr: ["$timeCreated", 3, 2] }, createdDate1: {$substr:["$dateCreated",8,2]}, todaysDate1:{$substr:["$todayDate",8,2]} } }, { $project: { _id: 1, name: 1, price: 1, author: 1, publication: 1, username: 1, createdAt: 1, updatedAt: 1, currentTime: 1, dateCreated: 1, timeCreated: 1,createdDate1:{$toInt:"$createdDate1"}, todaysDate1:{$toInt:"$todaysDate1"}, todayDate: 1, todaysTime: 1, todaysHours: { $toInt: "$todaysHours" }, todaysMins: { $toInt: "$todaysMins" }, createdHour: { $toInt: "$createdHour" }, createdMins: { $toInt: "$createdMins" } } },{$project:{  _id:1,name:1,createdDate1:1,todaysdate1:1,price:1,author:1,publication:1,username:1,createdAt:1,updatedAt:1,currentTime:1,dateCreated:1,todaysDate1:1,timeCreated:1,todayDate:1,todaysTime:1, todaysHours:1,todaysMins:1, createdHour:1, createdDate1:1 , createdMins:1, totalCreatedMins:{$multiply:["$createdHour",60]}, totalCurrentMins:{$multiply:["$todaysHours",60]} } },{$project:{  _id:1,name:1,price:1,author:1,publication:1,username:1,createdDate1:1,todaysDate1:1,createdAt:1,updatedAt:1,currentTime:1,dateCreated:1,timeCreated:1,todayDate:1,todaysTime:1, todaysHours:1,todaysMins:1, createdHour:1, createdMins:1, totalCreatedMins:1, totalCurrentMins:1 , diff_mins:{$subtract:["$totalCurrentMins","$totalCreatedMins"]}, diff_days:{$subtract:["$todaysDate1","$createdDate1"]} }},{$match:{diff_mins:{$lte:10}}},{$match:{diff_days:{$gte:0}}}])
            // console.log(data) ;
            res.status(200).send(data) ;
        } catch (error) {
            // console.log(error) ;
           res.status(404).send({"msg":"error occurred in viewing books which created after 10min"}) ;
        }
    } 
}

module.exports = {creator , view , dele , viewall , edit , bookTypeOldNew } ;