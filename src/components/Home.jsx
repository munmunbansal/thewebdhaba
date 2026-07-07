import { useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "./Home.css";
import waiterClosed from "../assets/waiter.png";
import waiterOpen from "../assets/waiter_open.png";
import bellSound from "../assets/bell.mp3";
import { FaCheckCircle } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

// 5 katoris evenly spaced — angles calculated from top (-90deg)
const thaliItems = [
  { label: "Projects",   sublabel: "Assamese Thali",    emoji: "🍛", desc: "Web apps, tools & experiments cooked fresh from scratch." },
  { label: "Skills",     sublabel: "South Indian Thali", emoji: "🍚", desc: "React, CSS, Java, and a pinch of everything in between." },
  { label: "Experience", sublabel: "Rajasthani Thali",  emoji: "🥘", desc: "Internships, projects & lessons learned the hard way." },
  { label: "About Me",   sublabel: "Bengali Thali",     emoji: "🍜", desc: "A developer who codes with chai in hand and dreams in desi." },
  { label: "Contact",    sublabel: "Special Dessert",   emoji: "🍮", desc: "Drop a line — let's build something delicious together." },
];

const Home = () => {
  const [showWaiter,    setShowWaiter]    = useState(false);
  const [lidOpen,       setLidOpen]       = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [bellRung,      setBellRung]      = useState(false);
  const [hoveredPlate,  setHoveredPlate]  = useState(null);

  const bookRef  = useRef();
  const audioRef = useRef(new Audio(bellSound));
  const navigate = useNavigate();

  const handleOrder    = () => setShowWaiter(true);
  const handleLidClick = () => setLidOpen(true);

  const toggleSelectItem = (item) =>
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );

  const handleBellRing = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setBellRung(true);
    navigate("/music");
  };

  // Thali is 460px wide → center = 230px, orbit radius = 155px
  // We place each plate absolutely inside the thali using pixel coords
  // so the plate's own center lands exactly on the orbit circle
  const THALI = 460;
  const CENTER = THALI / 2;   // 230
  const ORBIT  = 155;          // px from thali center to katori center
  const TOTAL  = thaliItems.length; // 5

  return (
    <div className="home-wrapper">

      {/* ── Fireflies — full page ── */}
      <div className="fireflies">
        {[...Array(22)].map((_, i) => (
          <div key={i} className="firefly" style={{ "--i": i }} />
        ))}
      </div>

      {/* ── Hanging Lanterns ── */}
      <div className="lantern-row">
        <div className="lantern lantern-left">
          <div className="lantern-string" />
          <div className="lantern-body">
            <div className="lantern-glow" />
            <div className="lantern-stripe" />
            <div className="lantern-stripe" />
            <div className="lantern-tassel" />
          </div>
        </div>
        <div className="lantern lantern-right">
          <div className="lantern-string" />
          <div className="lantern-body">
            <div className="lantern-glow" />
            <div className="lantern-stripe" />
            <div className="lantern-stripe" />
            <div className="lantern-tassel" />
          </div>
        </div>
      </div>

      {/* ── Signboard ── */}
      {!showWaiter && (
        <div className="dhaba-signboard">
          <div className="sign-chains">
            <div className="sign-chain left-chain" />
            <div className="sign-chain right-chain" />
          </div>
          <div className="sign-board">
            <div className="sign-decoration">✦ ✦ ✦</div>
            <h1 className="sign-title">🍲 Munmun's Portfolio Dhaba 🍲</h1>
            <p className="sign-tagline">"Serving Code with Desi Flavour"</p>
            <div className="sign-decoration">✦ ✦ ✦</div>
          </div>
        </div>
      )}

      {/* ── Rotating Steel Thali ── */}
      {!showWaiter && (
        <div className="rotating-table">
          <div className="steel-shine shine-1" />
          <div className="steel-shine shine-2" />
          <div className="steel-rim" />
          <div className="table-center">
            <div className="center-flower">❋</div>
          </div>

          {thaliItems.map((item, idx) => {
            // angle: start from top, go clockwise, evenly spaced
            const angleDeg = (360 / TOTAL) * idx - 90;
            const rad = (angleDeg * Math.PI) / 180;
            // pixel position of katori CENTER inside the thali div
            const cx = CENTER + ORBIT * Math.cos(rad); // left
            const cy = CENTER + ORBIT * Math.sin(rad); // top

            return (
              <div
                key={idx}
                className="plate"
                style={{
                  // place the plate so its center (50%,50%) sits at (cx, cy)
                  left: `${cx}px`,
                  top:  `${cy}px`,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseEnter={() => setHoveredPlate(idx)}
                onMouseLeave={() => setHoveredPlate(null)}
              >
                <div className="katori">
                  <div className="katori-rim" />
                  <div className="katori-body">
                    {/* counter-rotate food emoji so it stays upright */}
                    <div
                      className="katori-food"
                      style={{ animationName: "spinReverse" }}
                    >
                      {item.emoji}
                    </div>
                    <div className="katori-steam">
                      <span /><span /><span />
                    </div>
                  </div>
                  <div className="katori-shadow" />
                </div>

                {/* counter-rotate labels so they stay upright */}
                <p className="plate-label"  style={{ animationName: "spinReverse" }}>{item.label}</p>
                <p className="plate-sublabel" style={{ animationName: "spinReverse" }}>{item.sublabel}</p>

                {hoveredPlate === idx && (
                  <div className="diary-card">
                    <div className="diary-top">
                      <span className="diary-emoji">{item.emoji}</span>
                      <span className="diary-title">{item.label}</span>
                    </div>
                    <div className="diary-divider" />
                    <p className="diary-desc">{item.desc}</p>
                    <div className="diary-corner top-left" />
                    <div className="diary-corner top-right" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Waiter Section ── */}
      {showWaiter && (
        <div className="waiter-entry">
          <div className="waiter-container">
            {!lidOpen && (
              <img src={waiterClosed} alt="waiter closed" className="waiter waiter-closed" onClick={handleLidClick} />
            )}
            {lidOpen && (
              <img src={waiterOpen} alt="waiter open" className="waiter waiter-open" onClick={handleLidClick} />
            )}
            {!lidOpen && <div className="lid-indicator">👆 Tap to Open</div>}
            {lidOpen && (
              <div className="steam">
                <span /><span /><span />
              </div>
            )}
          </div>

          {lidOpen && (
            <div className="book-menu">
              <div className="book-header">
                <GiForkKnifeSpoon size={28} />
                <h2>Aaj Ka Menu</h2>
                <GiForkKnifeSpoon size={28} />
              </div>

              <HTMLFlipBook ref={bookRef} width={220} height={320} showCover={true}>

                <div className="page cover-page">
                  <div className="cover-diya">🪔</div>
                  <h2>Munmun's Dhaba</h2>
                  <div className="cover-divider">── ✦ ──</div>
                  <p>🍜 Frontend Curry</p>
                  <p>🔥 Java Tandoor</p>
                  <p>🥘 Backend Special</p>
                  <p>🏗 Engineering Thali</p>
                  <p>☕ Contact Chai</p>
                  <div className="cover-footer">👉 Flip to explore</div>
                </div>

                <div className="page">
                  <h3>🍜 Frontend Curry</h3>
                  {["React Masala - Hot 🌶", "CSS Art Bhaji - Fresh 🥬", "Tailwind Paratha - Crispy 🫓", "JavaScript Daal - Rich 🟡"].map((item) => (
                    <p key={item} className={`menu-item ${selectedItems.includes(item) ? "selected" : ""}`} onClick={() => toggleSelectItem(item)}>
                      {item} {selectedItems.includes(item) && <FaCheckCircle />}
                    </p>
                  ))}
                </div>

                <div className="page">
                  <h3>🔥 Java Tandoor</h3>
                  {["Spring Boot Tikka - Spicy 🌶", "REST API Roti - Soft 🫓", "SQL Sambhar - Tangy 🍲", "MongoDB Halwa - Sweet 🍮"].map((item) => (
                    <p key={item} className={`menu-item ${selectedItems.includes(item) ? "selected" : ""}`} onClick={() => toggleSelectItem(item)}>
                      {item} {selectedItems.includes(item) && <FaCheckCircle />}
                    </p>
                  ))}
                </div>

                <div className="page">
                  <h3>🥘 Backend Special</h3>
                  {["Git Chutney - Zesty 🫙", "Docker Dosa - Crisp 🫓", "Linux Lassi - Cool 🥤", "Agile Achaar - Bold 🌿"].map((item) => (
                    <p key={item} className={`menu-item ${selectedItems.includes(item) ? "selected" : ""}`} onClick={() => toggleSelectItem(item)}>
                      {item} {selectedItems.includes(item) && <FaCheckCircle />}
                    </p>
                  ))}
                </div>

                <div className="page">
                  <h3>🏗 Engineering Thali</h3>
                  {["WebDhaba - Portfolio 🍽", "Chat App - Real Time 💬", "Music Player - Vibes 🎵", "AI Project - Smart 🤖"].map((item) => (
                    <p key={item} className={`menu-item ${selectedItems.includes(item) ? "selected" : ""}`} onClick={() => toggleSelectItem(item)}>
                      {item} {selectedItems.includes(item) && <FaCheckCircle />}
                    </p>
                  ))}
                </div>

                <div className="page">
                  <h3>☕ Contact Chai</h3>
                  {["LinkedIn - Connect ☕", "GitHub - Follow 🐙", "Email - Drop a Line 📬", "Resume - Download 📄"].map((item) => (
                    <p key={item} className={`menu-item ${selectedItems.includes(item) ? "selected" : ""}`} onClick={() => toggleSelectItem(item)}>
                      {item} {selectedItems.includes(item) && <FaCheckCircle />}
                    </p>
                  ))}
                </div>

                <div className="page confirm-page">
                  <div className="confirm-icon">✅</div>
                  <h2>Shukriya! 🙏</h2>
                  <p>Order placed with love</p>
                  <p>Dhaba Wala aa raha hai 🍽️</p>
                  <div className="confirm-footer">~ Munmun's Dhaba</div>
                </div>

              </HTMLFlipBook>

              {selectedItems.length > 0 && !bellRung && (
                <>
                  <button className="bell-button" onClick={handleBellRing}>🔔</button>
                  <div className="order-summary">
                    🛒 {selectedItems.length} item{selectedItems.length > 1 ? "s" : ""} selected
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {!showWaiter && (
        <button className="order-button" onClick={handleOrder}>
          🔔 Call the Dhaba Wala
        </button>
      )}
    </div>
  );
};

export default Home;
