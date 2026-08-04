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
    visitedAnalysis:{
        timestamp : []
    }
},{
    timestamps: true
})

module.exports= mongoose.model("URL",urls);