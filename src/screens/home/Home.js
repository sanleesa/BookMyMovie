import React, { Fragment, useEffect, useState } from 'react';
import Header from '../../common/header/Header';
import './Home.css';
import { makeStyles } from "@material-ui/styles";
import UpcomingMovies from './home-component/UpcomingMovies';
import AllMovies from './home-component/AllMovies';


const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    flexWrap: "nowrap",
  }
}));

function Home() {

  const classes = useStyles();

  const [movieData, setMovieData] = useState([]);

  let tileData = [];

  const getUpComingMovie = async () => {
    try {
      const rawResponse = await fetch('http://localhost:8085/api/v1/movies?page=1&limit=10');
      const jsonData = await rawResponse.json();
      return jsonData;
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    getUpComingMovie().then((movies) => {
      setMovieData(movies.movies)
    });
  }, [])

  movieData.forEach(element => {
    tileData.push(element);
  });
  

  return (
    <Fragment>
      <Header />
      <div className='home-heading'>
        <span className='heading-text'>
          Upcoming Movies
        </span>
      </div>
      <UpcomingMovies classes={classes} tileData={tileData} />
      <AllMovies movies={tileData} />
    </Fragment>
  )
}

export default Home;