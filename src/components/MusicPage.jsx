// src/components/MusicPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ added
import "./MusicPage.css";
import boyGuitar from "../assets/guitarboy.png";

const MusicPage = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const navigate = useNavigate(); // ✅ added

  const sampleSongs = [
    { title: "Shape of You", artist: "Ed Sheeran", src: "/music/shape-of-you.mp3" },
    { title: "Let Me Love You", artist: "DJ Snake ft. Justin Bieber", src: "/music/let-me-love-you.mp3" },
    { title: "Perfect", artist: "Ed Sheeran", src: "/music/perfect.mp3" },
  ];

  const handleSearch = () => {
    const filtered = sampleSongs.filter((song) =>
      song.title.toLowerCase().includes(query.toLowerCase())
    );
    setSongs(filtered);
  };

  // ✅ function to redirect when song finishes
  const handleSongEnd = () => {
    navigate("/moodboard"); // this assumes you have a route set up for /moodboard
  };

  return (
    <div className="music-page">
      <div className="overlay"></div>

      <div className="music-container">
        <div className="music-content">
          <h1>🎧 Your Waiting Lounge</h1>
          <p>Search and play your favorite song while we prepare your order 🍽️</p>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search song..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>🔍</button>
          </div>

          <div className="song-list">
            {songs.length > 0 ? (
              songs.map((song, idx) => (
                <div key={idx} className="song-card">
                  <p>
                    <strong>{song.title}</strong> - {song.artist}
                  </p>
                  <button onClick={() => setCurrentSong(song)}>▶️ Play</button>
                </div>
              ))
            ) : (
              <p className="hint">Try searching for a song above 🎵</p>
            )}
          </div>

          {currentSong && (
            <div className="player">
              <h3>Now Playing: {currentSong.title}</h3>
              <audio controls autoPlay onEnded={handleSongEnd}>  {/* ✅ added onEnded */}
                <source src={currentSong.src} type="audio/mpeg" />
              </audio>
            </div>
          )}
        </div>

        <div className="guitar-image">
          <img src={boyGuitar} alt="Boy with guitar" />
        </div>
      </div>
    </div>
  );
};

export default MusicPage;


