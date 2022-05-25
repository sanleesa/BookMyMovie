import React, { Fragment, useEffect, useState } from 'react';
import Header from '../../common/header/Header';
import './Home.css';
import UpcomingMovies from './home-component/UpcomingMovies';
import ReleasedMovies from './home-component/ReleasedMovies';
import MovieFilter from './home-component/MovieFilter';

function Home() {

  const [upComingMoviesData, setUpComingMoviesData] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [genresData, setGenresData] = useState([]);
  const [showMoives, setShowMovies] = useState(true);
  const [artistsData, setArtistsData] = useState([]);
  const [formFilter, setFormFilter] = useState({
    movieName: "",
    genresList: [],
    artistsList: [],
    releaseDateStart: null,
    releaseDateEnd: null,
  });

  let tileData = [];
  let upComingTileData = [];


  // const getUpComingMoviesData = async () => {
  //   try {
  //     const rawResponse = await fetch('http://localhost:8085/api/v1/movies?page=1&limit=20');
  //     const jsonData = await rawResponse.json();
  //     return jsonData;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };

  const getMovieList = async () => {
    try {
      const rawResponse = await fetch('http://localhost:8085/api/v1/movies?page=1&limit=20');
      const jsonData = await rawResponse.json();
      return jsonData;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getGenresList = async () => {
    try {
      const rawResponse = await fetch('http://localhost:8085/api/v1/genres');
      const jsonData = await rawResponse.json();
      return jsonData
    } catch (error) {
      throw new Error(error);
    }
  };

  const getArtistsList = async () => {
    try {
      const rawResponse = await fetch('http://localhost:8085/api/v1/artists?page=1&limit=10');
      const jsonData = rawResponse.json();
      return jsonData;
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleFormChange = (event) => {
    const formValues = { ...formFilter };
    formValues[event.target.name] = event.target.value;
    setFormFilter(formValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    filterList();
  };

  const handleAutoCompleteChange = (event, value) => {
    const formValues = { ...formFilter };
    formValues[`${event.target.id.split("-")[0]}List`] = value;
    setFormFilter(formValues);
  };

  const handleDateChange = (date, value, name) => {
    const formValues = { ...formFilter };
    formValues[name] = new Date(date).toDateString();
    setFormFilter(formValues);
  };

  const filterList = () => {
    setShowMovies(false)
    let finalFilteredMovieList = moviesData;
    const formValues = { ...formFilter };
    if (formValues.movieName) {
      finalFilteredMovieList = finalFilteredMovieList.filter(
        movie =>
          movie.title.toLowerCase() === formValues.movieName.toLowerCase()
      );
    }
    if (formValues.genresList.length > 0) {
      finalFilteredMovieList = finalFilteredMovieList.filter(movie => {
        for (let i = 0; i < formValues.genresList.length; i++) {
          if (movie.genres.includes(formValues.genresList[i].name)) return true;
        }
        return false;
      });
    }
    if (formValues.artistsList.length > 0) {
      finalFilteredMovieList = finalFilteredMovieList.filter(movie => {
        const fullNameArray = [];
        movie.artists.forEach(artist =>
          fullNameArray.push(`${artist.first_name} ${artist.last_name}`)
        );
        for (let i = 0; i < formValues.artistsList.length; i++) {
          if (
            fullNameArray.includes(
              `${formValues.artistsList[i].first_name} ${formValues.artistsList[i].last_name}`
            )
          )
            return true;
        }
        return false;
      });
    }
    if (formValues.releaseDateStart && formValues.releaseDateEnd) {
      const releaseDateStart = new Date(formValues.releaseDateStart);
      const releaseDateEnd = new Date(formValues.releaseDateEnd);
      finalFilteredMovieList = finalFilteredMovieList.filter(movie => {
        const movieReleaseDate = new Date(movie.release_date);
        return (
          movieReleaseDate >= releaseDateStart &&
          movieReleaseDate <= releaseDateEnd
        );
      });
    } else if (formValues.releaseDateStart && !formValues.releaseDateEnd) {
      const releaseDateStart = new Date(formValues.releaseDateStart);
      finalFilteredMovieList = finalFilteredMovieList.filter(movie => {
        const movieReleaseDate = new Date(movie.release_date);
        return movieReleaseDate >= releaseDateStart;
      });
    } else if (!formValues.releaseDateStart && formValues.releaseDateEnd) {
      const releaseDateEnd = new Date(formValues.releaseDateEnd);
      finalFilteredMovieList = finalFilteredMovieList.filter(movie => {
        const movieReleaseDate = new Date(movie.release_date);
        return movieReleaseDate <= releaseDateEnd;
      });
    }
    setMoviesData(finalFilteredMovieList);
    setShowMovies(true);
  };



  useEffect(() => {
    // getUpComingMoviesData().then((movies) => {
    //   setUpComingMoviesData(movies.movies);
    // });

    getMovieList().then((movies) => {
      setMoviesData(movies.movies);
      setUpComingMoviesData(movies.movies);
    });

    getGenresList().then((genre) => {
      setGenresData(genre.genres);
    });

    getArtistsList().then((artist) => {
      setArtistsData(artist.artists);
    });
  }, []);

  upComingMoviesData.forEach(element => {
    if (element.status === "PUBLISHED") {
      upComingTileData.push(element);
    }
  });


  moviesData?.forEach(element => {
    if (element.status == "RELEASED") {
      tileData.push(element);
    }
  });

  return (
    <Fragment>
      <Header />
      <div className='home-heading'>
        <span className='heading-text'>
          Upcoming Movies
        </span>
      </div>
      <UpcomingMovies tileData={upComingTileData} />
      <div className="flex-container">
        <div className="left">
          { showMoives? <ReleasedMovies movies={tileData} /> : <></> }
        </div>
        <div className="right">
          <MovieFilter
            genres={genresData}
            artists={artistsData}
            handleSubmit={handleSubmit}
            handleChange={handleFormChange}
            handleAutoCompleteChange={handleAutoCompleteChange}
            handleDateChange={handleDateChange}
            releaseDateStart={formFilter.releaseDateStart}
            releaseDateEnd={formFilter.releaseDateEnd}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default Home;