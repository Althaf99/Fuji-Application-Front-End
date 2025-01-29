import React, { useState, useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import UnfoldMoreDoubleOutlinedIcon from "@mui/icons-material/UnfoldMoreDoubleOutlined";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import { Grid } from "@material-ui/core";

import styles from "./styles.js";
import { Logout } from "@mui/icons-material";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  navBar: {
    width: "300px",
    position: "fixed",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    display: "grid",
    height: "100vh",
    paddingLeft: "5px",
  },
  content: {
    flexGrow: 1,
    padding: "40px",
  },
  childContent: {
    paddingLeft: "240px",
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "black",
    textDecoration: "none",
    size: "10px",
  },

  activeLink: {
    // color: "#095936", // Change the color for the active tab as desired
    textDecoration: "none",
  },
}));

const SideNavBar = () => {
  const classes = useStyles();
  const location = useLocation(); // If using React Router, this helps in determining the current path
  const cls = styles({ location: location });
  return (
    <>
      <Grid className={classes.navBar}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          position="static"
          open={true}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div>
            <List style={{ paddingBottom: "10px" }}>
              <Link
                to="/dashboard"
                className={`${classes.link} ${
                  location.pathname === "/dashboard" ? classes.activeLink : ""
                }`}
              >
                <ListItem sx={cls.home}>
                  <ListItemIcon>
                    <SpaceDashboardOutlinedIcon sx={cls.icon} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dashboard"
                    primaryTypographyProps={{
                      fontSize: "18px",
                      fontWeight: "440px",
                    }}
                  />
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List style={{ paddingBottom: "20px", paddingTop: "10px" }}>
              <Link
                to="/deliveryNote"
                className={`${classes.link} ${
                  location.pathname === "/deliveryNote"
                    ? classes.activeLink
                    : ""
                }`}
              >
                <ListItem sx={cls.deliveryNote}>
                  <ListItemIcon>
                    <LocalShippingOutlinedIcon sx={cls.icon} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Delivery Note"
                    primaryTypographyProps={{
                      fontSize: "18px",
                      fontWeight: "440px",
                    }}
                  />
                </ListItem>
              </Link>
            </List>
            <List style={{ paddingBottom: "20px" }}>
              <Link
                to="/invoice"
                className={`${classes.link} ${
                  location.pathname === "/invoice" ? classes.activeLink : ""
                }`}
              >
                <ListItem sx={cls.invoice}>
                  <ListItemIcon>
                    <PaidOutlinedIcon sx={cls.icon} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Invoice"
                    primaryTypographyProps={{
                      fontSize: "18px",
                      fontWeight: "440px",
                    }}
                  />
                </ListItem>
              </Link>
            </List>
            <List style={{ paddingBottom: "20px" }}>
              <Link
                to="/purchaseOrder"
                className={`${classes.link} ${
                  location.pathname === "/purchaseOrder"
                    ? classes.activeLink
                    : ""
                }`}
              >
                <ListItem sx={cls.po}>
                  <ListItemIcon>
                    <CloudSyncOutlinedIcon sx={cls.icon} />
                  </ListItemIcon>
                  <ListItemText
                    primary="PO"
                    primaryTypographyProps={{
                      fontSize: "18px",
                      fontWeight: "440px",
                    }}
                  />
                </ListItem>
              </Link>
            </List>
            <List style={{ paddingBottom: "20px" }}>
              <Link
                to="/excess"
                className={`${classes.link} ${
                  location.pathname === "/excess" ? classes.activeLink : ""
                }`}
              >
                <ListItem sx={cls.excess}>
                  <ListItemIcon>
                    <UnfoldMoreDoubleOutlinedIcon sx={cls.icon} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Excess"
                    primaryTypographyProps={{
                      fontSize: "18px",
                      fontWeight: "440px",
                    }}
                  />
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List>
              <Link
                to="/stock"
                className={`${classes.link} ${
                  location.pathname === "/stock" ? classes.activeLink : ""
                }`}
              >
                <ListItem sx={cls.stock}>
                  <ListItemIcon>
                    <InventoryOutlinedIcon sx={cls.icon} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Stock"
                    primaryTypographyProps={{
                      fontSize: "18px",
                      fontWeight: "440px",
                    }}
                  />
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List>
              <Link
                to="/addItems"
                className={`${classes.link} ${
                  location.pathname === "/addItems" ? classes.activeLink : ""
                }`}
              >
                <ListItem sx={cls.addItems}>
                  <ListItemIcon>
                    <FactoryOutlinedIcon sx={cls.icon} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Create Items"
                    primaryTypographyProps={{
                      fontSize: "18px",
                      fontWeight: "440px",
                    }}
                  />
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List style={{ paddingBottom: "20px" }}>
              <Link to="/" className={`${classes.link}`}>
                <ListItem>
                  <ListItemIcon>
                    <Logout sx={cls.logout} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{
                      fontSize: "18px",
                      fontWeight: "440px",
                    }}
                  />
                </ListItem>
              </Link>
            </List>
          </div>
        </Drawer>
      </Grid>
      <Grid className={classes.childContent}>
        <Outlet />
      </Grid>
    </>
  );
};

export default SideNavBar;
