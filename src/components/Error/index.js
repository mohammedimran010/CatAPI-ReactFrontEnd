import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Error = (props) => {
  const { errorMessage } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="error">{errorMessage}</Alert>
    </div>
  );
};

export default Error;
