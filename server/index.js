const express = require('express');
const cors= require('cors');
const mongoose = require('mongoose');

const app= express();

app.use(cors());
app.use(express.json());

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('MONGODB database connection established');
}).catch((err)=>{
    console.log(err.message);
})

const server=app.listen(process.env.PORT,()=>{
    console.log('listening on port '+process.env.PORT) 
});


 