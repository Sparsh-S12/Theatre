const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const showRoutes=require('./routes/shows');
const ticketsRoutes=require('./routes/tickets');
require('dotenv').config();

const app=express();
app.use(bodyParser.json());


const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log("Connected to MongoDB");
}).catch((error)=>{
    console.error("Error connecting to MongoDB",error);
    process.exit(1);
})



app.use('/shows',showRoutes);
app.use('/tickets',ticketsRoutes);

app.listen(3000,function(){
    console.log(`Server running on port ${port}`);
})