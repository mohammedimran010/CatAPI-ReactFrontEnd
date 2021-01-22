import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Tooltip,
} from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import { useDispatch, useSelector } from "react-redux";

import * as TheCatAPI from "../../api";
import {
  selectFavouriteById,
  selectVotesUpById,
  selectVotesDownById,
} from "../../redux/slices/catsSlice";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  header: {
    padding: 0,
    textAlign: "center",
  },
  media: {
    height: 200,
  },
  unFavourite: {
    color: "red",
  },
  favourite: {
    color: "green",
  },
  voteUp: {
    color: "green",
    cursor: "pointer",
  },
  voteDown: {
    color: "red",
    cursor: "pointer",
  },
});

const CatCard = (props) => {
  const { image } = props;
  const classes = useStyles();
  const imageID = image.id;
  const favourite = useSelector((state) => selectFavouriteById(state, imageID));
  const votesUp = useSelector((state) => selectVotesUpById(state, imageID));
  const votesDown = useSelector((state) => selectVotesDownById(state, imageID));
  const score = votesUp - votesDown;
  const dispatch = useDispatch();

  const saveFavourite = () => {
    dispatch(TheCatAPI.saveFavourite(imageID));
  };

  const deleteFavourite = () => {
    dispatch(TheCatAPI.deleteFavourite(favourite.id));
  };

  const voteUp = () => {
    dispatch(TheCatAPI.toggleVote(imageID, 1));
  };

  const voteDown = () => {
    dispatch(TheCatAPI.toggleVote(imageID, 0));
  };

  const renderFavUnFavBtn = () => {
    if (favourite) {
      return (
        <Tooltip title="Un-Favourite Image" aria-label="unFavourite">
          <div>
            <FavoriteIcon
              className={classes.unFavourite}
              onClick={() => deleteFavourite()}
            />
            &nbsp;&nbsp;
          </div>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title="Favourite Image" aria-label="Favourite">
          <div>
            <FavoriteIcon onClick={() => saveFavourite()} />
            &nbsp;&nbsp;
          </div>
        </Tooltip>
      );
    }
  };

  const renderVoteUp = () => (
    <Tooltip title="Vote Up" aria-label="voteUp">
      <div>
        <ThumbUpIcon className={classes.voteUp} onClick={() => voteUp()} />
        &nbsp;{votesUp}
      </div>
    </Tooltip>
  );

  const renderVoteDown = () => (
    <Tooltip title="Vote Down" aria-label="voteDown">
      <div>
        <ThumbDownIcon
          className={classes.voteDown}
          onClick={() => voteDown()}
        />
        &nbsp;{votesDown}
      </div>
    </Tooltip>
  );

  const addGridItem = (content) => (
    <Grid item xs={false} sm={4} container direction="row" alignItems="center">
      {content}
    </Grid>
  );

  return (
    <Card>
      <CardHeader subheader={`Score: ${score}`} className={classes.header} />
      <CardMedia className={classes.media} image={image.url} />
      <CardActions>
        <Grid container>
          {addGridItem(renderFavUnFavBtn())}
          {addGridItem(renderVoteUp())}
          {addGridItem(renderVoteDown())}
        </Grid>
      </CardActions>
    </Card>
  );
};

export default CatCard;
