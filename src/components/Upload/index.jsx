import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Typography, Link } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";

import * as TheCatAPI from "../../api";
import {
  selectLoading,
  selectError,
  selectRedirect,
} from "../../redux/slices/catsSlice";
import Progress from "../Progress";
import Error from "../Error";

const useStyles = makeStyles({
  root: {
    padding: 10,
    textAlign: "center",
  },
  uploadBtn: {
    marginTop: 5,
  },
});

const Upload = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const redirect = useSelector(selectRedirect);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [disabledUpload, setDisableUpload] = useState(true);

  const setImage = (files) => {
    const fileSelected = files[0];
    if (fileSelected) {
      setSelectedImage(fileSelected);
      setDisableUpload(false);
    }
  };

  const uploadImage = () => {
    dispatch(TheCatAPI.uploadImage(selectedImage));
  };

  return (
    <Grid item xs={12} sm={8}>
      {isLoading ? <Progress /> : ""}
      {error ? <Error errorMessage={error} /> : ""}

      <div className={classes.root}>
        <Typography variant="subtitle2" gutterBottom>
          Any uploads must comply with the &nbsp;
          <Link
            href="https://docs.thecatapi.com/image-upload"
            target="_blank"
            rel="noreferrer"
          >
            upload guidelines
          </Link>
          .
        </Typography>
        <DropzoneArea
          acceptedFiles={["image/*"]}
          dropzoneText={"Drag and drop an image here or click"}
          onChange={(files) => setImage(files)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={uploadImage}
          disabled={disabledUpload}
          className={classes.uploadBtn}
        >
          Upload
        </Button>
      </div>
      {redirect && <Redirect to="/" />}
    </Grid>
  );
};

export default Upload;
