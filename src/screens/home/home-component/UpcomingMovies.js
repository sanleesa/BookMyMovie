import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles'
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    flexWrap: "nowrap",
  },
}));

function UpcomingMovies({ tileData }) {
  const classes = useStyles();
  return (
    <Fragment>
      <ImageList
        className={classes.root}
        style={{ margin: 0 }}
        cols={6}
        rowHeight={250}>
        {(tileData || []).map(movie => (
          <ImageListItem key={movie.id}>
            <img src={movie.poster_url} alt={movie.title} />
            <ImageListItemBar title={movie.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </Fragment>
  )
}

export default UpcomingMovies;
