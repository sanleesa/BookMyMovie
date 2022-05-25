import React, { Fragment, useReducer, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  link: {
    cursor: "pointer",
  },
});

function ReleasedMovies({ movies }) {
  const classes = useStyles();

  const tempMovies = [ ...movies ]


  return (
    <Fragment>
      <ImageList cols={4} rowHeight={350} className={classes.link}>
        {tempMovies.map(movie => (
          <ImageListItem
            component={Link}
            to={`/details/${movie.id}`}
            key={movie.id}>
            <img src={movie.poster_url} alt={movie.title} />
            <ImageListItemBar
              title={movie.title}
              subtitle={`Release Date: ${new Date(
                movie.release_date
              ).toDateString()}`}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Fragment>
  )
}

export default ReleasedMovies;