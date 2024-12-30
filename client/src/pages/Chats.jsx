import React, { useEffect, useState } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';


export default function Chats(){

    const [Chats,setChats] = useState([])

    const fetchChats = async ()=>{
        const {data} = await axios.get("/api/chats");

        setChats(data);
    }

    useEffect(()=>{
        fetchChats();
    },[])

    return(
        <div>
            {Chats.map(chat=>(<div key={chat._id}>{chat.chatName}</div>))}
            <Button variant="text">Contained</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Contained</Button>
        </div>
    ) 

}