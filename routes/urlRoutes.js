const express = require('express')
const urlController = require('../controller/urlcontroller')

const router = express.Router();


router.post('/',urlController.handleUrlInput);
router.get('/analysis/:shortId',urlController.handleVistedAnalysis);
router.get('/:shortId',urlController.handleRedirectUrl);


module.exports=router;