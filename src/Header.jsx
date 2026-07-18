import React, { useState, useEffect, useCallback } from "react";
import { FaSearch, FaHome, FaUser, FaComment } from "react-icons/fa";
import "./header.css";

function Header() {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const API_KEY = "11ab1117a036358d42f55b2320020a34";

  const fetchMovies = useCallback(async (query) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }
    setIsLoading(true);
    setErr(null);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("Failed to fetch movies");
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      setErr(error.message);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchMovies(val);
    }, 300); 

    return () => clearTimeout(timeoutId);
  }, [val, fetchMovies]);

  const handleSearch = (e) => {
    setVal(e.target.value);
    if (selectedMovie) setSelectedMovie(null); 
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setVal("");           
    setMovies([]);        
  };

  const closeDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <div className="header">
        <div>
          <h2>LetWatchThis</h2>
        </div>

        <div className="search">
          <input
            type="text"
            value={val}
            onChange={handleSearch}
            placeholder="Enter Movie Name"
          />
          <button type="button">
            <FaSearch />
          </button>

          {movies.length > 0 && (
            <ul className="search-results">
              {movies.map((movie) => (
                <li
                  key={movie.id}
                  onClick={() => handleMovieClick(movie)}
                  className="search-result-item"
                >
                  {movie.title}
                  {movie.release_date && (
                    <span className="year"> ({movie.release_date.split("-")[0]})</span>
                  )}
                </li>
              ))}
            </ul>
          )}

          {isLoading && <div className="loading">Searching...</div>}
          {err && <div className="error">{err}</div>}
        </div>

        <div className="links">
          <a href="#"><FaHome /> Home</a>
          <a href="#"><FaUser /> About Us</a>
          <a href="#"><FaComment /> Comment</a>
        </div>
      </div>

      {selectedMovie && (
        <div className="movie-details">
          <button className="close-btn" onClick={closeDetails}>✕</button>
          
          <div className="details-content">
            <div className="details-poster">
              {selectedMovie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                />
              ) : (
                <div className="no-poster">No Image Available</div>
              )}
            </div>

            <div className="details-info">
              <h1>{selectedMovie.title}</h1>
              {selectedMovie.release_date && (
                <p className="release-date">
                  {new Date(selectedMovie.release_date).getFullYear()}
                </p>
              )}

              <div className="rating">
                ★ {selectedMovie.vote_average ? selectedMovie.vote_average.toFixed(1) : "N/A"}
                <span className="vote-count"> ({selectedMovie.vote_count} votes)</span>
              </div>

              {selectedMovie.genres && (
                <p className="genres">
                  {selectedMovie.genres.map(g => g.name).join(", ")}
                </p>
              )}

              <p className="overview">{selectedMovie.overview}</p>

              {selectedMovie.original_language && (
                <p>
                  <strong>Original Language:</strong> {selectedMovie.original_language.toUpperCase()}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;