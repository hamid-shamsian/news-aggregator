import { useState, ReactNode } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import CloseIcon from "@mui/icons-material/Close";
import CustomNavLink from "../common/CustomNavLink";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const menuItems = [
  { title: "News Feed", to: "/", icon: <NewspaperIcon /> },
  { title: "Search in News", to: "search", icon: <ManageSearchIcon /> }
];

const Menu = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const ResponsiveMenu = isMobile ? MobileMenu : DesktopMenu;

  const toggleMenu = () => setOpen(prevState => !prevState);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar sx={{ position: "fixed", zIndex: 5000 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton color='inherit' aria-label='open drawer' onClick={toggleMenu} edge='start'>
            {!open ? <MenuIcon /> : isMobile ? <CloseIcon /> : <ChevronLeftIcon />}
          </IconButton>
          <Typography variant='h6' noWrap component='h1'>
            News Aggregator
          </Typography>
        </Toolbar>
      </AppBar>

      <ResponsiveMenu open={open} onClose={toggleMenu}>
        <List component='nav' sx={{ mt: 8 }}>
          {menuItems.map((item, i) => (
            <ListItem key={i} disablePadding sx={{ display: "block", color: "inherit" }} component={CustomNavLink} to={item.to} end>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0, textAlign: "left" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </ResponsiveMenu>

      <Box component='main' sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Menu;
