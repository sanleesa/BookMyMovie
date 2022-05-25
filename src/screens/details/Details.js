import React, { Fragment, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import YouTube from "react-youtube";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Header from '../../common/header/Header';

const useStyles = makeStyles({
  button: {
    margin: "8px 0px 0px 24px",
    "&:hover, &:focus": {
      cursor: "pointer",
    },
    height: 24,
  },
  typo: {
    marginTop: 16,
  },
});
const opts = {
  height: "390",
  width: "100%",
};

function Details({ match }) {
  const classes = useStyles();
  const [rating, setRating] = useState(0);
  const [movies, setMovies] = useState([]);
  const [artisitList, setArtistList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [youtubeList, setYoutubeList] = useState("");

  const getMovieList = async (id) => {
    try {
      const rawResponse = await fetch('http://localhost:8085/api/v1/movies/' + id, {
        headers: {
          "Accept": "application/json;charset=UTF-8"
        },
      });
      const jsonData = await rawResponse.json();
      setMovies(jsonData);
      setArtistList(jsonData.artists);
      setYoutubeList(jsonData.trailer_url);
      setGenresList(jsonData.genres);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getMovieList(match.params.id);
  }, []);

  let videoCode;
  if (youtubeList) {
    videoCode = youtubeList.split("v=")[1].split("&")[0];
  }
  console.log(youtubeList)

  return (
    <Fragment>
      <Header showBookNowButton={true} id={match.params.id} />
      <Button component={Link} to="/" className={classes.button}>
        <ArrowBackIosIcon />
        Back to home
      </Button>
      <Grid container style={{ overflow: "hidden" }}>
        <Grid item xs={2}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <img src={movies.poster_url} alt="poster" />
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h2">{movies.title}</Typography>
          <Typography variant="body1">
            <strong>Genres: </strong>
            {genresList.toString()}
          </Typography>
          <Typography variant="body1">
            <strong>Duration: </strong>
            {movies.duration}
          </Typography>
          <Typography variant="body1">
            <strong>Release Date: </strong>
            {new Date(movies.release_date).toDateString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Rating: </strong>
            {movies.critics_rating}
          </Typography>
          <Typography className={classes.typo} variant="body1">
            <strong>Plot: </strong>
            <a href={movies.wiki_url}>(Wiki Link)</a>
            {" " + movies.storyline}
          </Typography>
          <Typography className={classes.typo} variant="body1">
            <strong>Trailer: </strong>
          </Typography>
          <YouTube videoId={videoCode} opts={opts} config={{ youtube: { playerVars: { origin: 'https://youtube.com', host: 'https://www.youtube.com' } } }} />
        </Grid>
        <Grid item xs={2} style={{ padding: 0 }}>
          <Box display="block">
            <Typography variant="body1">
              <strong>Rate this movie:</strong>
            </Typography>
            <br />
            <Rating
              name="customized-empty"
              size="large"
              value={rating}
              onChange={(event, value) => setRating(value)}
              icon={<StarBorderIcon fontSize="inherit" />}
              precision={0.5}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
          </Box>
          <Box display="block">
            <Typography>
              <span className="bold">Artists:</span>
            </Typography>
            <ImageList cols={2} className={classes.typo}>
              {artisitList?.map(artist => (
                <ImageListItem key={artist.id}>
                  <img src={artist.profile_url} alt={artist.first_name} />
                  <ImageListItemBar
                    title={`${artist.first_name} ${artist.last_name}`}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Details;