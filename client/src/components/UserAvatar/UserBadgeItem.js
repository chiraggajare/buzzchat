import { Chip } from "@mui/material";
import { Cancel } from "@mui/icons-material";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Chip
      label={
        <>
          {user.name}
          {admin === user._id && <span> (Admin)</span>}
        </>
      }
      onClick={handleFunction}
      onDelete={handleFunction}
      deleteIcon={<Cancel />}
      color="purple"
      sx={{ m: 1, fontSize: 12, borderRadius: "8px", padding: "4px 8px" }}
    />
  );
};

export default UserBadgeItem;
