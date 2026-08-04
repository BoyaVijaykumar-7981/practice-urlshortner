const ShortId = require('shortid');
const urls=require("../models/urls")

const handleUrlInput = async(req,res)=>{
   const body = req.body;
   const url = body.url;
   
   urls.create({
    
   })
}