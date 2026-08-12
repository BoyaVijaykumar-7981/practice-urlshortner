const express = require('express')
const URL = require('../models/urls')

const router = express.Router();

router.get('/', async (req, res) => {
   const allUrls = await URL.find({}).sort({ createdAt: -1 });
   const id = req.query.id;
   return res.render('staticHome', { urls: allUrls, id: id });
})

module.exports = router;