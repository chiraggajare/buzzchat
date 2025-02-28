import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/chatProvider";
import { Box } from "@mui/material";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { AppBar } from '@mui/material';


export default function Chats() {

    const { user } = ChatState();

    return (
        <div style={{width: "100vw"}}>
                {user && <SideDrawer />}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: '91vh',
                    padding: '10px',
                }}
            >
                {user && <MyChats />}
                {user && <ChatBox />}
            </Box>
        </div>
    )

}