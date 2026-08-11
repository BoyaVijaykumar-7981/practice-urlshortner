const express = require('express')
const urlController = require('../controller/urlcontroller')
const URL=require("../models/urls")

const router = express.Router();


router.post('/',urlController.handleUrlInput);
router.get('/test',async(req,res)=>{
    const allurls = await URL.find({});
    return res.render('home',{
        urls : allurls
    })
});
router.get('/analysis/:shortId',urlController.handleVistedAnalysis);
router.get('/:shortId',urlController.handleRedirectUrl);


module.exports=router;