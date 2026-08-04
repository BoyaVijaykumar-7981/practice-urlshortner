const express = require('express')

const app = express();
app.use(express.json());
const port = 8002;


app.listen(port,()=>{
    console.log(`Server started at ${port}`)
})