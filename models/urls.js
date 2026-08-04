const mongoose = require('mongoose');

const urls = new mongoose.Schema({
    shortId:{
        type : String,
        required : true,
        unique : true
    },
    url:{
        type : String,
        required : true
    },
    vistedAnalysis:{
        timestamp : []
    }
})

module.exports= mongoose.model("URL",urls);