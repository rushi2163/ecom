const express=require('express');
const app=express();


const userRoute=require('./routes/user')
app.use(userRoute);
app.listen(3000);
