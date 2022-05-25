import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles'
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';

// const useStyles = makeStyles(theme => ({
//   root: {
//     margin: 0,
//     flexWrap: "nowrap",
//   },
// }));

const gridList = {
  flexWrap: 'nowrap',
  transform: 'translateZ(0)',
};

function UpcomingMovies({ tileData }) {
  //const classes = useStyles();
  return (
    <Fragment>
      <GridList style={gridList} cols={6} cellHeight={250}>
        {tileData.map(movies => (
          <GridListTile key={movies.id}>
            <img src={movies.poster_url} alt={movies.title} />
            <GridListTileBar
              title={movies.title}
            />
          </GridListTile>
        ))}
      </GridList>
    </Fragment>
  )
}

export default UpcomingMovies;
