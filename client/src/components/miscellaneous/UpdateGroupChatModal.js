import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem"
import UserListItem from "../UserAvatar/UserListItem";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load search results");
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        { chatId: selectedChat._id, chatName: groupChatName },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      console.error("Error renaming group");
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) return;
    if (selectedChat.groupAdmin._id !== user._id) return;

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        { chatId: selectedChat._id, userId: user1._id },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.error("Error adding user");
      setLoading(false);
    }
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) return;

    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        { chatId: selectedChat._id, userId: user1._id },
        config
      );
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      console.error("Error removing user");
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <VisibilityIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{selectedChat.chatName}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexWrap="wrap" gap={1} pb={2}>
            {selectedChat.users.map((u) => (
              <UserBadgeItem key={u._id} user={u} handleFunction={() => handleRemove(u)} />
            ))}
          </Box>
          <TextField
            fullWidth
            label="Chat Name"
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
            margin="dense"
          />
          <Button onClick={handleRename} disabled={renameLoading} variant="contained" color="primary" sx={{ mt: 1 }}>
            {renameLoading ? <CircularProgress size={24} /> : "Update"}
          </Button>
          <TextField
            fullWidth
            label="Add User to Group"
            onChange={(e) => handleSearch(e.target.value)}
            margin="dense"
          />
          {loading ? (
            <CircularProgress sx={{ mt: 2 }} />
          ) : (
            searchResult.map((user) => (
              <UserListItem key={user._id} user={user} handleFunction={() => handleAddUser(user)} />
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleRemove(user)} color="error">Leave Group</Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateGroupChatModal;