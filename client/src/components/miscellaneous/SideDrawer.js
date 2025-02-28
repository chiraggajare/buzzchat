import React, { useState, useEffect } from 'react';
import { Button, Tooltip, Box, Typography, AppBar, Toolbar, Menu, MenuItem, Drawer, IconButton, TextField, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { ChatState } from '../../Context/chatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import UserListItem from '../UserAvatar/UserListItem';

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (!search) {
        setSearchResult([]);
        return;
      }
      try {
        setLoading(true);
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const { data } = await axios.get(`/api/user?search=${search}`, config);
        const filteredData = data.filter(user => user.name.toLowerCase().startsWith(search.toLowerCase()));
        setSearchResult(filteredData);
        setLoading(false);
      } catch (error) {
        console.log("Error searching users:", error);
        setLoading(false);
      }
    };
    
    const debounceSearch = setTimeout(fetchUsers, 300);
    return () => clearTimeout(debounceSearch);
  }, [search, user.token]);

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: { "Content-type": "application/json", Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      console.log("Error accessing chat:", error);
      setLoadingChat(false);
    }
  };

  return (
    <AppBar position="static" sx={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
      <Toolbar>
        <Tooltip title="Search for user">
          <Button onClick={toggleDrawer(true)}>
            <SearchIcon />
            <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
              Search Users
            </Typography>
          </Button>
        </Tooltip>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h4">BuzzChat</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <NotificationsIcon />
        <AccountCircleIcon
          aria-label="menu"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          sx={{ padding: 1, cursor: 'pointer' }}
        />
        <Typography variant="h6" sx={{ ml: 1 }}>{user.name}</Typography>
        <Menu id="simple-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
          <ProfileModal user={user}>
            <MenuItem sx={{ color: 'black' }}>My Profile</MenuItem>
          </ProfileModal>
          <MenuItem onClick={logoutHandler} sx={{ color: 'black' }}>Logout</MenuItem>
        </Menu>
      </Toolbar>

      {/* MUI Side Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}
        sx={{ '& .MuiDrawer-paper': { backgroundColor: 'rgb(46, 46, 46)', width: 400 } }}>
        <Box sx={{ p: 2 }}>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>Search Users</Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              fullWidth
              label="Search by name or email"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                input: { color: 'white' }, 
                label: { color: 'white' },
                '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } }
              }}
            />
          </Box>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ maxHeight: '50vh', overflowY: 'auto' }}>
              {searchResult?.map((user) => (
                <UserListItem key={user._id} user={user} handleFunction={() => accessChat(user._id)} />
              ))}
            </Box>
          )}
          {loadingChat && <CircularProgress sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} />}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default SideDrawer;