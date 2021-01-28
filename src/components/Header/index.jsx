import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core";
import { Home } from "@material-ui/icons";

import navLinks from "../../routes";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {navLinks.map(({ text, path }) => {
          if (path === "/") {
            return (
              <IconButton
                color="inherit"
                edge="start"
                aria-label="Home"
                component={Link}
                to={path}
                key={path}
              >
                <Home />
              </IconButton>
            );
          } else {
            return (
              <Button
                color="inherit"
                size="large"
                variant="text"
                component={Link}
                to={path}
                key={path}
              >
                {text}
              </Button>
            );
          }
        })}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
