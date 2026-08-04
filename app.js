const express = require('express')
const urlRoute = require('./routes/urlRoutes');
const dotenv = require('dotenv')
const app = express();

dotenv.config();

app.use(express.json());

const connectDB = require('./DBConnection/MongoConn');

connectDB();

const port = 8002;
app.use("/url",urlRoute);

app.listen(port,()=>{
    console.log(`Server started at ${port}`)
})