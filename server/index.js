const express = require('express')
const app = express()
const dotenv = require('dotenv');
const { chats } = require('./Data/data');
const PORT = process.env.PORT||8080
dotenv.config();


app.get('/',(req,res)=>{
    res.send("This is from chat app backend!")
})

app.get('/api/chats', (req,res)=>{
    res.send(chats); 
})


app.get('/api/chats/:id', (req,res)=>{
    // console.log(req.params.id);

    const singleChat = chats.find((c)=>c._id === req.params.id)
    res.send(singleChat);

})



app.listen(PORT, ()=>{
    console.log(`Server started at port: ${PORT}`)
})
