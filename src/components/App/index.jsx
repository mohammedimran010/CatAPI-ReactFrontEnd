import { Switch, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Header from "../Header";
import navLinks from "../../routes";

const App = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={2}></Grid>
        <Switch>
          {navLinks.map(({ path, component }) => {
            if (path === "/") {
              return (
                <Route exact path={path} key={path} component={component} />
              );
            } else {
              return <Route path={path} key={path} component={component} />;
            }
          })}
        </Switch>
        <Grid item xs={false} sm={2}></Grid>
      </Grid>
    </Grid>
  );
};

export default App;
