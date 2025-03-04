import { Add } from "@mui/icons-material";
import {
  Box,
  Stack,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { getSender } from "./config/ChatLogics"
import GroupChatModal from "./miscellaneous/GroupChatModel";
import { ChatState } from '../Context/ChatProvider';

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

    const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chats", config);
      console.log(data)
      setChats(data);
    } catch (error) {
        console.log(error)
    }

  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Paper
      sx={{
        display: { xs: selectedChat ? "none" : "flex", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        width: { xs: "100%", md: "20%" },
        borderRadius: 0,
        borderRight: 1,
        borderColor: "white",
        bgcolor: "rgba(0, 0, 0, 0.15)",
        height:{ xs: "100%", md: "96%" }
      }}
      elevation={3}
    >
      {/* Header */}
      <Box
        sx={{
          pb: 2,
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h5" fontFamily="Work Sans">
          My Chats
        </Typography>
        <GroupChatModal>
          <Button
            variant="contained"
            size="small"
            startIcon={<Add />}
            sx={{ textTransform: "none" }}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      {/* Chat List */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          
          width: "100%",
          height: "100%",
          borderRadius: 2,
          overflowY: "auto",
        }}
      >
        {chats ? (
          <Stack spacing={1} sx={{ overflowY: "auto" }}>
            {chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                sx={{
                  cursor: "pointer",
                  bgcolor: selectedChat === chat ? "#f77f00" : "#black",
                  color: selectedChat === chat ? "white" : "black",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  transition: "0.2s",
                  '&:hover': {
                    bgcolor: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Typography>
                {chat.latestMessage && (
                  <Typography variant="body2" color="white">
                    <b>{chat.latestMessage.sender.name}: </b>
                    {chat.latestMessage.content.length > 50
                      ? `${chat.latestMessage.content.substring(0, 51)}...`
                      : chat.latestMessage.content}
                  </Typography>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Paper>
  );
};

export default MyChats;
