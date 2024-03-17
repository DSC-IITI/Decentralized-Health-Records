import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Typography, makeStyles } from "@material-ui/core";
import { ConnectButton } from "web3uikit";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

class Header extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h5" className={useStyles.title}>
            Decentralized Medical Records
          </Typography>
          <ConnectButton moralisAuth={false} />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
