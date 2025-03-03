import { Avatar, Tooltip, CircularProgress, Box, Typography } from "@mui/material";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "./config/ChatLogics"
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <Box display="flex" key={m._id} alignItems="center">
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip title={m.sender.name} placement="bottom-start" arrow>
                <Avatar
                  sx={{ mt: "7px", mr: 1, width: 32, height: 32, cursor: "pointer" }}
                  alt={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <Typography
              sx={{
                backgroundColor: m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 0.5 : 1.5,
                borderRadius: "20px",
                padding: "8px 16px",
                maxWidth: "75%",
                wordWrap: "break-word",
              }}
            >
              {m.content}
            </Typography>
          </Box>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
