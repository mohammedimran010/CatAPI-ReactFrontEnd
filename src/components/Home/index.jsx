import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import * as TheCatAPI from "../../api";
import {
  selectLoading,
  selectError,
  selectImages,
} from "../../redux/slices/catsSlice";
import Progress from "../Progress";
import Error from "../Error";
import CatCard from "../CatCard";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const data = useSelector(selectImages);

  useEffect(() => {
    const getImages = () => {
      dispatch(TheCatAPI.getImages());
    };
    getImages();
  }, [dispatch]);
  return (
    <Grid item xs={12} sm={8} className={classes.root}>
      {isLoading ? <Progress /> : ""}
      {error ? <Error errorMessage={error} /> : ""}
      {data && data.length === 0 && <div>No images have been uploaded</div>}
      <Grid container spacing={2}>
        {data &&
          data.length > 0 &&
          data.map((img) => (
            <Grid item xs={12} sm={3} key={img.id}>
              <CatCard image={img} />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default Home;
