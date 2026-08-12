const ShortId = require('shortid');
const urls=require("../models/urls")

const handleUrlInput = async(req,res)=>{
   const body = req.body;
   const url = body.url ? body.url.trim() : '';
   if(!url) return res.status(400).json({error:"url is required"});

   // Reuse existing mapping so same URL always returns same short ID.
   let existingDoc = await urls.findOne({ url: url });
   if (!existingDoc) {
      const shortID = ShortId.generate();
      existingDoc = await urls.create({
         shortId: shortID,
         url: url,
         visitedAnalysis : { timestamp: [] }
      })
   }

   // PRG pattern prevents form re-submit on refresh.
   return res.redirect(`/?id=${existingDoc.shortId}`)
   //return res.json({id:shortID});
}

const handleRedirectUrl = async(req,res)=>{
    const shortId = req.params.shortId;
    if(!shortId) return res.status(400).json({message : "ShortId required"});
   const redirectDoc = await urls.findOneAndUpdate(
      { shortId: shortId },
      { $push: { 'visitedAnalysis.timestamp': Date.now() } },
      { new: true }
   )
   if(!redirectDoc || typeof redirectDoc.url !== 'string' || redirectDoc.url.trim() === '') {
      return res.status(404).json({message:"ShortId not found"});
   }
   return res.redirect(redirectDoc.url);
}

const handleVistedAnalysis=async(req,res)=>{
    const shortId = req.params.shortId;
    if(!shortId) return res.status(400).json({message : "ShortId required"});
    const data = await urls.findOne({shortId:shortId});
    if(!data || typeof data.url !== 'string' || data.url.trim() === '') {
      return res.status(404).json({message:"ShortId not found"});
   }
   // return res.status(200).json({
   //    shortId: data.shortId,
   //    url: data.url,
   //    visitedAnalysis: data.visitedAnalysis,
   //    createdAt: data.createdAt,
   //    updatedAt: data.updatedAt
   // });
   const allUrls = await urls.find({}).sort({ createdAt: -1 });
   return res.render('staticHome',{
      data : data,
      urls: allUrls
   })
}


module.exports = {handleUrlInput,handleRedirectUrl,handleVistedAnalysis}