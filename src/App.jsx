import React, { useState, useEffect, useCallback } from "react";
import './style.css'
// import Popup from 'reactjs-popup';
import { BsTextarea } from "react-icons/bs";

function App() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("popular");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [recom, setRecom] = useState("")

  const API_KEY = "11ab1117a036358d42f55b2320020a34";
  const BASE_URL = "https://api.themoviedb.org/3";

  const fetchMovies = useCallback(async (categ) => {
   
    if (!categ) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/movie/${categ}?api_key=${API_KEY}&page=100`);
      if (!response.ok) {
        throw new Error("Error Happened. Movie cannot be fetched.");
      }
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(category);
  }, [category, fetchMovies]);

  

  

  return (
    <>
     <div className="container">
      <aside>
        <div className="desc">
            
            <h2>🎬 Need a Recommendation?</h2>
            <p>
                Not sure what to watch next? Let our movie recommender guide you to the
                perfect film based on your mood, favorite genres, or trending releases.
            </p>
            <p>
                👉 Try it now and discover your next favorite movie!
            </p>
        </div>

      </aside>


      <main className="main-one">
        <select className="selectOp" value={category} onChange={(event) => setCategory(event.target.value)}>
        <option value="popular">Popular</option>
        <option value="top_rated">Top Rated</option>
        <option value="upcoming">Upcoming</option>
        <option value="now_playing">Now Playing</option>
      </select>

       {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="movies-container">
        { movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <div className="poster-container">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                />
              ) : (
                <div className="no-poster">No Image Available</div>
              )}
              <div className="rating-badge">
                ★ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </div>
            </div>

            <div className="card-content">
              <h3>{movie.title}</h3>
              <p className="language">
                {movie.original_language ? movie.original_language.toUpperCase() : ""}
              </p>
              <details className="overview">{movie.overview}</details>
            </div>
          </div>
        ))}
      </div>
      </main>

     </div>
    </>
  );
}

export default App;