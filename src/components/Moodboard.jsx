// src/components/MoodBoard.jsx
import { useState } from "react";
import "./MoodBoard.css";

const MoodBoard = () => {
  const [mood, setMood] = useState(null);

  const moods = {
    Chill: {
      color: "linear-gradient(135deg, #89f7fe, #66a6ff)",
      message: "You’re in a chill mood 🌙 — relax and enjoy your meal.",
      music: "/music/chill-vibe.mp3",
    },
    Romantic: {
      color: "linear-gradient(135deg, #ff9a9e, #fecfef)",
      message: "Love is in the air 💕 — perfect vibes for your date.",
      music: "/music/romantic-vibe.mp3",
    },
    Energetic: {
      color: "linear-gradient(135deg, #f6d365, #fda085)",
      message: "Let’s turn up the energy 🔥 — get ready to groove!",
      music: "/music/energetic-vibe.mp3",
    },
    Cozy: {
      color: "linear-gradient(135deg, #cfd9df, #e2ebf0)",
      message: "It’s cozy time ☕ — warm lights, calm tunes, and comfort food.",
      music: "/music/cozy-vibe.mp3",
    },
  };

  return (
    <div
      className="moodboard-page"
      style={{
        background: mood ? moods[mood].color : "linear-gradient(135deg, #232526, #414345)",
      }}
    >
      <div className="moodboard-content">
        {!mood ? (
          <>
            <h1>🌈 Set Your Mood</h1>
            <p>Select a vibe while we prepare your order 🍽️</p>

            <div className="mood-buttons">
              {Object.keys(moods).map((m) => (
                <button key={m} onClick={() => setMood(m)}>
                  {m}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="mood-display">
            <h2>{mood} Vibes 🎵</h2>
            <p>{moods[mood].message}</p>
            <audio controls autoPlay>
              <source src={moods[mood].music} type="audio/mpeg" />
            </audio>
            <button className="back-btn" onClick={() => setMood(null)}>
              ⬅️ Choose Another Mood
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodBoard;

