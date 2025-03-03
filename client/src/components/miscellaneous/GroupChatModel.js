import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    CircularProgress,
    Chip,
    IconButton,
    Snackbar,
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  import { useState } from "react";
  import axios from "axios";
  import { ChatState } from "../../Context/ChatProvider"
  import UserListItem from "../UserAvatar/UserListItem"
  
  const GroupChatModal = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [groupChatName, setGroupChatName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ open: false, message: "", severity: "info" });
  
    const { user, chats, setChats } = ChatState();
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const showToast = (message, severity) => {
      setToast({ open: true, message, severity });
    };
  
    const handleGroup = (userToAdd) => {
      if (selectedUsers.some((u) => u._id === userToAdd._id)) {
        showToast("User already added", "warning");
        return;
      }
      setSelectedUsers([...selectedUsers, userToAdd]);
    };
  
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
        showToast("Failed to load search results", "error");
        setLoading(false);
      }
    };
  
    const handleDelete = (delUser) => {
      setSelectedUsers(selectedUsers.filter((user) => user._id !== delUser._id));
    };
  
    const handleSubmit = async () => {
      if (!groupChatName || selectedUsers.length === 0) {
        showToast("Please fill all fields", "warning");
        return;
      }
  
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const { data } = await axios.post(
          `/api/chats/group`,
          { name: groupChatName, users: JSON.stringify(selectedUsers.map((u) => u._id)) },
          config
        );
        setChats([data, ...chats]);
        handleClose();
        showToast("New Group Chat Created!", "success");
      } catch (error) {
        showToast("Failed to create the chat!", "error");
      }
    };
  
    return (
      <>
        <span onClick={handleOpen}>{children}</span>
  
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Create Group Chat
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
  
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Chat Name"
              fullWidth
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <TextField
              label="Add Users (e.g., John, Piyush, Jane)"
              
              fullWidth
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1}}>
              {selectedUsers.map((user) => (
                <Chip key={user._id} label={user.name} onDelete={() => handleDelete(user)} />
              ))}
            </Box>
  
            {loading ? (
              <CircularProgress size={24} sx={{ alignSelf: "center"}} />
            ) : (
              searchResult.slice(0, 4).map((user) => (
                <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />
              ))
            )}
          </DialogContent>
  
          <DialogActions>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Create Chat
            </Button>
          </DialogActions>
        </Dialog>
  
        {/* Snackbar for Toast Messages */}
        <Snackbar
          open={toast.open}
          autoHideDuration={5000}
          onClose={() => setToast({ ...toast, open: false })}
          message={toast.message}
        />
      </>
    );
  };
  
  export default GroupChatModal;
  