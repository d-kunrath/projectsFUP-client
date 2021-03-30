import { Component } from "react";
import { NavLink, Link } from "react-router-dom";

// material ui
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// material ui styling
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    border: "1px solid #ffffff",
    borderRadius: "3px",
    color: "white",
    textDecoration: "none",
    padding: "5px",
    width: "78px",
    textAlign: "center",
  },
});

const active = {
  color: "#3F51B5",
  backgroundColor: "#abcdef",
  fontWeight: "700",
};

class Navbar extends Component {
  render = () => {
    const { classes, loggedInUser } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                projectsFUP
              </Link>
            </Typography>
            {loggedInUser ? (
              <div
                style={{
                  width: "280px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <NavLink
                  to="/students"
                  activeStyle={active}
                  className={classes.btn}
                >
                  Students
                </NavLink>
                <NavLink
                  to="/projects"
                  className={classes.btn}
                  activeStyle={active}
                >
                  Projects
                </NavLink>
                <Button
                  onClick={() => this.props.handleLogin(false)}
                  className={classes.btn}
                  style={{
                    textTransform: "none",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    padding: "inherit",
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div
                style={{
                  width: "185px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <NavLink
                  to="/signup"
                  className={classes.btn}
                  activeStyle={active}
                >
                  Sign up
                </NavLink>
                <NavLink
                  to="/login"
                  className={classes.btn}
                  activeStyle={active}
                >
                  Login
                </NavLink>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  };
}

export default withStyles(styles)(Navbar);
