const mangoose = require('mongoose');

const connectdb = async()=>{
    try{
        const mongoUri = process.env.MONGO_URI;

        if (typeof mongoUri !== 'string' || mongoUri.trim() === '') {
            throw new Error('MONGO_URI is missing or invalid in environment variables.');
        }

        await mangoose.connect(mongoUri);
        console.log('MongoDB connected')
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectdb;