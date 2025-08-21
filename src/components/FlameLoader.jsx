import React, { useEffect } from "react";
import "./FlameLoader.css";
import fireSound from "../assets/fire.mp3";

const FlameLoader = () => {
  useEffect(() => {
    const audio = new Audio(fireSound);
    audio.volume = 0.5;
  
    const tryPlay = () => {
      audio.play().then(() => {
        console.log("🔥 Fire sound playing");
      }).catch(err => {
        console.warn("Still blocked:", err.message);
      });
  
      // Once played or attempted, remove listener
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("keydown", tryPlay);
      window.removeEventListener("scroll", tryPlay);
    };
  
    // Try once immediately (may fail)
    audio.play().catch(() => {
      console.warn("Autoplay failed, waiting for interaction...");
      // Add fallback event listeners
      window.addEventListener("click", tryPlay);
      window.addEventListener("keydown", tryPlay);
      window.addEventListener("scroll", tryPlay);
    });
  
    return () => {
      audio.pause();
      audio.currentTime = 0;
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("keydown", tryPlay);
      window.removeEventListener("scroll", tryPlay);
    };
  }, []);
  

  return (
    <div className="flame-loader">
      <div className="fire">
        <div className="flame"></div>
        <div className="flame"></div>
        <div className="flame"></div>
        <div className="flame"></div>
        <div className="flame"></div>
      </div>
      <p className="loader-text">"🔥 For the best experience, tap to enter the kitchen!"
      .</p>
    </div>
  );
};

export default FlameLoader;



