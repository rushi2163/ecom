const express=require('express');
const app=express();
const jsonparse = require('body-parser')

const userRoute=require('./routes/user')
app.use(jsonparse.json())
app.use('/user',userRoute);
app.listen(3000);
