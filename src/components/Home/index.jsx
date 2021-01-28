import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import * as TheCatAPI from "../../api";
import {
  selectLoading,
  selectError,
  selectImages,
  selectPaginationCount,
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
  const MAX_NO_OF_IMAGES_PER_ROW = 4;
  const NO_OF_VIEW_BY_GROUPS = 3;

  const [limit, setLimit] = useState(MAX_NO_OF_IMAGES_PER_ROW);
  const [orderBy, setOrderBy] = useState("ASC");
  const [page, setPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(undefined);

  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const data = useSelector(selectImages);
  const paginationCount = useSelector(selectPaginationCount);

  useEffect(() => {
    const getImages = () => {
      dispatch(TheCatAPI.getImages(page, limit, orderBy));
    };
    setNumberOfPages(Math.round(Math.ceil(paginationCount / limit)));
    getImages();
  }, [dispatch, page, limit, orderBy, paginationCount]);

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleNoOfImagesChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event) => {
    setPage(event.target.value);
  };

  const generatePageOptions = () =>
    Array(numberOfPages)
      .fill(null)
      .map((value, index) => (
        <MenuItem key={index + 1} value={index}>
          {index + 1}
        </MenuItem>
      ));

  const generateViewByOptions = () =>
    Array(NO_OF_VIEW_BY_GROUPS)
      .fill(null)
      .map((value, index) => {
        const optionValue = MAX_NO_OF_IMAGES_PER_ROW * (index + 1);
        return (
          <MenuItem key={optionValue} value={optionValue}>
            {optionValue}
          </MenuItem>
        );
      });

  return (
    <Grid item xs={12} sm={8} className={classes.root}>
      {isLoading && <Progress />}
      {error && <Error errorMessage={error} />}
      {data.length === 0 && <div>No images have been uploaded</div>}

      {data.length > 0 && (
        <>
          <Grid container spacing={4}>
            {numberOfPages && (
              <Grid item>
                <FormControl>
                  <InputLabel id="page-select-label">Page</InputLabel>
                  <Select
                    data-testid="page-select-label"
                    labelId="page-select-label"
                    value={page}
                    onChange={handlePageChange}
                  >
                    {generatePageOptions()}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item>
              <FormControl>
                <InputLabel id="images-select-label">Images</InputLabel>
                <Select
                  data-testid="images-select-label"
                  labelId="images-select-label"
                  value={limit}
                  onChange={handleNoOfImagesChange}
                >
                  {generateViewByOptions()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel id="order-select-label">Order</InputLabel>
                <Select
                  data-testid="order-select-label"
                  labelId="order-select-label"
                  id="order-select-label"
                  value={orderBy}
                  onChange={handleOrderByChange}
                >
                  <MenuItem value="ASC">Asc</MenuItem>
                  <MenuItem value="DESC">Desc</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {data.map((img) => (
              <Grid item xs={12} sm={3} key={img.id}>
                <CatCard image={img} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Home;
