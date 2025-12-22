import { useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "./Home.css";
import waiterClosed from "../assets/waiter.png";   // closed lid
import waiterOpen from "../assets/waiter_open.png"; // open lid image
import bellSound from "../assets/bell.mp3";
import { FaCheckCircle } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [showWaiter, setShowWaiter] = useState(false);
  const [lidOpen, setLidOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [bellRung, setBellRung] = useState(false);

  const bookRef = useRef();
  const audioRef = useRef(new Audio(bellSound))
  const navigate = useNavigate();
console.log("showWaiter:", showWaiter);

  const handleOrder = () => {
    setShowWaiter(true);
  };

  const handleLidClick = () => {
    setLidOpen(true);
  };

  const toggleSelectItem = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };
const handleBellRing = () => {
  audioRef.current.currentTime = 0;
  audioRef.current.play();

  setBellRung(true);

  // Navigate to the music page after ringing the bell
  navigate("/music"); // <-- NEW LINE
};

  return (
    
    <div className="home-wrapper">
      {!showWaiter && (
        
        <div className="rotating-table">
          {["South Indian Thali", "Assamese Thali", "Rajasthani Thali"].map((skill, idx) => {
            const angle = (360 / 3) * idx;
            return (
              <div
                key={idx}
                className="plate"
                style={{
                  transform: `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`,
                }}
              >
                <p>{skill}</p>
              </div>
            );
          })}
        </div>
      )}

      {showWaiter && (
        <div className="waiter-entry">
          
          <div className="waiter-container">
  {/* Waiter Closed */}
  {!lidOpen && (
    <img
      src={waiterClosed}
      alt="waiter closed"
      className="waiter waiter-closed"
      onClick={handleLidClick}
    />
  )}

  {/* Waiter Open */}
  {lidOpen && (
    <img
      src={waiterOpen}
      alt="waiter open"
      className="waiter waiter-open"
      onClick={handleLidClick}
    />
  )}

  {/* Lid Indicator */}
  {!lidOpen && <div className="lid-indicator">👆 Tap to Open</div>}

  {/* Steam animation when lid is open */}
  {lidOpen && (
    <div className="steam">
      <span></span>
      <span></span>
      <span></span>
    </div>
  )}
</div>


          {lidOpen && (
            <div className="book-menu">
              <div className="book-header">
                <GiForkKnifeSpoon size={30} /> <h2>Menu</h2>{" "}
                <GiForkKnifeSpoon size={30} />
              </div>

            
              <HTMLFlipBook ref={bookRef} width={220} height={320} showCover={true}>
                <div className="page">
                  <h2>Today's Special</h2>
                  <p>🍲 Main Course</p>
                  <p>🧀 Breads</p>
                  <p>🥤 Drinks</p>
                  <p>🍰 Desserts</p>
                </div>

                <div className="page">
                  <h3>🍲 Main Course</h3>
                  {["Dal Batti - ₹120", "Paneer Butter Masala - ₹180", "Chole Bhature - ₹150", "Paav-Bhajii - ₹200"].map((item) => (
                    <p
                      key={item}
                      className={`menu-item ${selectedItems.includes(item) ? "selected" : ""}`}
                      onClick={() => toggleSelectItem(item)}
                    >
                      {item} {selectedItems.includes(item) && <FaCheckCircle />}
                    </p>
                  ))}
                </div>

                <div className="page">
                  <h3>🧀 Breads</h3>
                  {["Garlic Naan - ₹60", "Tandoori Roti - ₹40", "Butter Kulcha - ₹70", "Stuffed Kulcha - ₹80"].map((item) => (
                    <p
                      key={item}
                      className={`menu-item ${selectedItems.includes(item) ? "selected" : ""}`}
                      onClick={() => toggleSelectItem(item)}
                    >
                      {item} {selectedItems.includes(item) && <FaCheckCircle />}
                    </p>
                  ))}
                </div>

                <div className="page">
                  <h3>🥤 Drinks</h3>
                  {["Masala Chaas - ₹50", "Fresh Lime Soda - ₹70", "Cold Coffee - ₹90", "Masala Chai - ₹50", "Hot Chocolate Coffee - ₹100", "Mojito - ₹155"].map((item) => (
                    <p
                      key={item}
                      className={`menu-item ${selectedItems.includes(item) ? "selected" : ""}`}
                      onClick={() => toggleSelectItem(item)}
                    >
                      {item} {selectedItems.includes(item) && <FaCheckCircle />}
                    </p>
                  ))}
                </div>

                <div className="page">
                  <h3>🍰 Desserts</h3>
                  {["Gulab Jamun - ₹90", "Rasmalai - ₹110", "Kesar Kulfi - ₹80", "Chocolate Brownie - ₹180", "Misthi Doi - ₹105"].map((item) => (
                    <p
                      key={item}
                      className={`menu-item ${selectedItems.includes(item) ? "selected" : ""}`}
                      onClick={() => toggleSelectItem(item)}
                    >
                      {item} {selectedItems.includes(item) && <FaCheckCircle />}
                    </p>
                  ))}
                </div>

                {/* Confirmation Page */}
                <div className="page">
                  <h2>✅ Order Confirmed!</h2>
                  <p>Thank you for ordering 🙏</p>
                  <p>Your meal will arrive shortly 🍽️</p>
                </div>
              </HTMLFlipBook>

              {/* Bell Button appears only when items are selected */}
              {selectedItems.length > 0 && !bellRung && (
                <button className="bell-button" onClick={handleBellRing}>
                  🔔 Ring the Bell
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {!showWaiter && (
        <button className="order-button" onClick={handleOrder}>
          Tap me to order
        </button>
      )}
    </div>
  );
};

export default Home;






