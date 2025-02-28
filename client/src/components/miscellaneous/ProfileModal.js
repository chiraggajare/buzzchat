import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ProfileModal = ({ user, children }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {children ? (
        <span onClick={handleOpen}>{children}</span>
      ) : (
        <IconButton onClick={handleOpen}>
          <VisibilityIcon />
        </IconButton>
      )}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: "center", fontSize: 32, fontFamily: "Work Sans", color: 'black' }}>
          {user.name}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar src={user.pic} alt={user.name} sx={{ width: 150, height: 150, mb: 2, color: 'black'}} />
          <Typography variant="h6" fontFamily="Work Sans"  sx={{ color: 'black'}}>
            Email: {user.email}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileModal;
