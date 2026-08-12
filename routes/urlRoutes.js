const express = require('express')
const urlController = require('../controller/urlcontroller')
const URL=require("../models/urls")

const router = express.Router();


router.post('/',urlController.handleUrlInput);

router.post('/admin/reset', async (req, res) => {
    const result = await URL.deleteMany({});
    return res.status(200).json({
        message: 'All URL data deleted',
        deletedCount: result.deletedCount
    });
});

router.get('/admin/stats/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const doc = await URL.findOne({ shortId: shortId });
    if (!doc) {
        return res.status(404).json({ message: 'ShortId not found' });
    }

    const visits = Array.isArray(doc?.visitedAnalysis?.timestamp)
        ? doc.visitedAnalysis.timestamp.length
        : 0;

    return res.status(200).json({
        shortId: doc.shortId,
        url: doc.url,
        visits: visits
    });
});

router.get('/test',async(req,res)=>{
    const allurls = await URL.find({});
    return res.render('home',{
        urls : allurls
    })
});
router.get('/analysis/:shortId',urlController.handleVistedAnalysis);
router.get('/:shortId',urlController.handleRedirectUrl);


module.exports=router;