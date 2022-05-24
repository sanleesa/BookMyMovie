import React, { Fragment } from 'react'
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";

function UpcomingMovies({ classes, tileData }) {
  return (
    <Fragment>
      <ImageList
        className={classes.root}
        style={{ margin: 0 }}
        cols={6}
        cellHeight={250}>
        {(tileData || []).map(movie => (
          <ImageListItem key={movie.id} className={classes.gridList}>
            <img src={movie.poster_url} alt={movie.title} />
            <ImageListItemBar title={movie.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </Fragment>
  )
}

export default UpcomingMovies;
