import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import "./header.css";

const Header = (props) => {
  const { setAppState } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutClick = () => {
    const logout = async () => {
      try {
        await axios.post(
          "https://frontend-take-home-service.fetch.com/auth/logout",
          {},
          {
            withCredentials: true,
          }
        );
        setAppState((prevAppState) => ({ ...prevAppState, isAuth: false }));
        navigate("/login");
      } catch (err) {
        setAppState((prevAppState) => ({
          ...prevAppState,
          error: true,
          message: `Tried to logout and an error occured.`,
        }));
        console.error(err);
      }
    };
    setAnchorEl(null);
    logout();
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white" }}>
      <Toolbar>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ marginLeft: "auto" }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundColor: `${theme.palette.primary.main}`,
            }}
          ></Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={logoutClick}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
