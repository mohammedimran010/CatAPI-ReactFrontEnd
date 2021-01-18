import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { Home } from "@material-ui/icons";

import navLinks from "../../routes";

const useStyles = makeStyles({
  homeIcon: {
    color: "white",
  },
  navLinkitem: {
    color: "white",
    textDecoration: "none",
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        {navLinks.map(({ text, path }) => {
          if (path === "/") {
            return (
              <Link to={path} key={path}>
                <IconButton
                  edge="start"
                  className={classes.homeIcon}
                  aria-label="home"
                >
                  <Home />
                </IconButton>
              </Link>
            );
          } else {
            return (
              <Link to={path} key={path} className={classes.navLinkitem}>
                {text}
              </Link>
            );
          }
        })}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
