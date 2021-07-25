import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { logout } from "../../store/utils/thunkCreators";
import { clearOnLogout } from "../../store/index";

const useStyles = makeStyles(() => ({
  ellipsis: {
    color: "#95A7C4",
    opacity: 0.5
  }
}));

const UserMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const open = Boolean(anchorEl);
  const logout = "Logout";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await props.logout(props.user.id);
  };

  return (
    <>
      <IconButton
        aria-label='user-options'
        aria-controls='user-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreHorizIcon classes={{ root: classes.ellipsis }} />
      </IconButton>
      <Menu
        id='user-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem key={logout} onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
