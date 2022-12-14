const express = require("express");
const app = express();
const PORT = process.env.PORT||5000;
const connectDB=require('./config/db');
//connect DataBase
 connectDB();
app.get('/',(req,res)=>{
    res.send(`API Running !`)
})
//Init Middleware
app.use(express.json({extended:false}));

//routs 
app.use('/api/users',require('./Routes/api/users'));
app.use('/api/auth',require('./Routes/api/auth'));
app.use('/api/profile',require('./Routes/api/profile'));
app.use('/api/posts',require('./Routes/api/posts'));

app.listen(PORT,()=>{
console.log(`app is working on port ${PORT}`)
})