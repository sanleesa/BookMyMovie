import React, { Fragment } from 'react';
import makeStyles from '@material-ui/core/styles';

const useStyles = makeStyles({
  link: {
    cursor: "pointer",
  },
});

function AllMovies({ movies }) {
  const classes = useStyles();

  return (
    <Fragment>
      {movies.map((m) => {
        <p>m.title</p>
      })}
    </Fragment>
  )
}

export default AllMovies;