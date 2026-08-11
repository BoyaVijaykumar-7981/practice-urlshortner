const express = require('express')
const urlRoute = require('./routes/urlRoutes');
const staticRoute = require('./routes/staticRouter')
const dotenv = require('dotenv')
const app = express();
const path = require('path');

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

const connectDB = require('./DBConnection/MongoConn');

connectDB();

const port = process.env.port || 8002;


app.use("/url",urlRoute);
app.use("/",staticRoute);

app.listen(port,()=>{
    console.log(`Server started at ${port}`)
})