const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const PORT = process.env.PORT||8080
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();
connectDB();
const app = express()


app.use(express.json()); // accepts json data from frontend x


app.get('/',(req,res)=>{
    res.send("This is from chat app backend!")
})

app.use('/api/user',userRoutes)
app.use('/api/chats',chatRoutes)



app.listen(PORT, ()=>{
    console.log(`SERVER STARTED AT PORT ===============> ${PORT}`)
})
