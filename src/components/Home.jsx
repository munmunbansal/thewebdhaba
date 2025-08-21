import { useState } from "react";
import "./Home.css";
import waiter from "../assets/waiter.png"; // Add a waiter image to your assets folder

const skills = [
  "Web Developer",
  "Freelancer",
  "Engineer",
 

];

const Home = () => {
  const [showWaiter, setShowWaiter] = useState(false);

  const handleOrder = () => {
    setShowWaiter(true);
  };

  return (
    <div className="home-wrapper">
      {!showWaiter && (
        <div className="rotating-table">
          {skills.map((skill, idx) => {
            const angle = (360 / skills.length) * idx;
            return (
              <div
                key={idx}
                className="plate"
                style={{ transform: `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)` }}
              >
                <p>{skill}</p>
              </div>
            );
          })}
        </div>
      )}

      {showWaiter && (
        <div className="waiter-entry">
          <img src={waiter} alt="waiter" className="waiter" />
        </div>
      )}

      <button className="order-button" onClick={handleOrder}>Order</button>
    </div>
  );
};

export default Home;


