import { Box } from "@mui/material";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      sx={{
        display: { xs: selectedChat ? "flex" : "none", md: "flex" },
        alignItems: "center",
        flexDirection: "column",
        p: 3,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        width: { xs: "100%", md: "74%" },
        borderRadius: "0px",
        borderLeft: "1px solid #ccc",
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
