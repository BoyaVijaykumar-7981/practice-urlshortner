const mangoose = require('mongoose');

const connectdb = async()=>{
    try{
        await mangoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected')
    }catch(err){
        console.log(err.message);
    }
}

module.exports = connectdb;