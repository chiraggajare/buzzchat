import { Avatar, Box, Typography } from "@mui/material";
// import { ChatState } from "../../Context/chatProvider";


const UserListItem = ({ user, handleFunction }) => {

  return (
    <Box
      onClick={handleFunction}
      sx={{
        cursor: "pointer",
        backgroundColor: "black",
        '&:hover': {
          backgroundColor: "#38B2AC",
          color: "black",
        },
        width: "31vh",
        display: "flex",
        alignItems: "center",
        color: "black",
        p: 2,
        m: 2,
        borderRadius: "8px",
      }}
    >
      <Avatar
        sx={{ mr: 2, cursor: "pointer" }}
        alt={user.name}
        src={user.pic}
      />
      <Box>
        <Typography variant="body1">{user.name}</Typography>
        <Typography variant="body2">
          <b>Email: </b>
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;
