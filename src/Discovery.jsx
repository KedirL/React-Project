
import React, { useState, useEffect, useCallback, useRef } from "react";
import './discovery.css'

function TrendingMovies({ onMovieClick }) {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const API_KEY = "11ab1117a036358d42f55b2320020a34";
  const containerRef = useRef(null);

  const fetchTrending = useCallback(async (pageNum, append = false) => {
    try {
      if (!append) setLoading(true);
      else setLoadingMore(true);

      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${pageNum}`
      );

      if (!res.ok) throw new Error("Failed to load trending movies");

      const data = await res.json();

      if (append) {
        setTrending(prev => [...prev, ...data.results]);
      } else {
        setTrending(data.results || []);
      }

      setHasMore(data.page < data.total_pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

 
  useEffect(() => {
    fetchTrending(1);
  }, [fetchTrending]);


  const handleScroll = () => {
    if (!containerRef.current || loadingMore || !hasMore) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

  
    if (scrollLeft + clientWidth >= scrollWidth * 0.8) {
      setPage(prev => {
        const nextPage = prev + 1;
        fetchTrending(nextPage, true);
        return nextPage;
      });
    }
  };

  return (
    <div className="trending-section">
      <h2>Trending Today</h2>

      {loading && <p>Loading trending movies...</p>}
      {error && <p>Error: {error}</p>}

      <div 
        className="trending-container"
        ref={containerRef}
        onScroll={handleScroll}
      >
        <div className="trending-scroll">
          {trending.map((movie) => (
            <div
              key={movie.id}
              className="movie-card horizontal"
              onClick={() => onMovieClick(movie)}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                />
              ) : (
                <div className="no-poster">No Image</div>
              )}
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
              </div>
            </div>
          ))}

          {loadingMore && <div className="loading-more">Loading more...</div>}
        </div>
      </div>
    </div>
  );
}

export default TrendingMovies;