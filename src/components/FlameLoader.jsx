// import React, { useEffect } from "react";
// import "./FlameLoader.css";
// import fireSound from "../assets/fire.mp3";

// const FlameLoader = () => {
//   useEffect(() => {
//     const audio = new Audio(fireSound);
//     audio.volume = 0.5;
  
//     const tryPlay = () => {
//       audio.play().then(() => {
//         console.log("🔥 Fire sound playing");
//       }).catch(err => {
//         console.warn("Still blocked:", err.message);
//       });
  
//       // Once played or attempted, remove listener
//       window.removeEventListener("click", tryPlay);
//       window.removeEventListener("keydown", tryPlay);
//       window.removeEventListener("scroll", tryPlay);
//     };
  
//     // Try once immediately (may fail)
//     audio.play().catch(() => {
//       console.warn("Autoplay failed, waiting for interaction...");
//       // Add fallback event listeners
//       window.addEventListener("click", tryPlay);
//       window.addEventListener("keydown", tryPlay);
//       window.addEventListener("scroll", tryPlay);
//     });
  
//     return () => {
//       audio.pause();
//       audio.currentTime = 0;
//       window.removeEventListener("click", tryPlay);
//       window.removeEventListener("keydown", tryPlay);
//       window.removeEventListener("scroll", tryPlay);
//     };
//   }, []);
  

//   return (
//     <div className="flame-loader">
//       <div className="fire">
//         <div className="flame"></div>
//         <div className="flame"></div>
//         <div className="flame"></div>
//         <div className="flame"></div>
//         <div className="flame"></div>
//       </div>
//       <p className="loader-text">🔥“Asli swaad, zinda aag par.”
//       .</p>
//     </div>
//   );
// };

// export default FlameLoader;



import { useRef, useState } from "react";
import "./FlameLoader.css";
import fireVideo from "../assets/fire.mp4";
import fireSound from "../assets/fire.mp3";

const FlameLoader = () => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [lit, setLit] = useState(false);

  const igniteFire = async () => {
    if (lit) return;

    try {
      // Play video
      videoRef.current.play();

      // 🔥 AUDIO WARM-UP (IMPORTANT)
      audioRef.current.volume = 0;
      await audioRef.current.play();
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      // 🔥 REAL PLAY
      audioRef.current.volume = 1;
      await audioRef.current.play();

      setLit(true);
    } catch (err) {
      console.log("Audio initialization blocked");
    }
  };

  return (
    <div
      className="flame-loader"
      onClick={igniteFire}
      onTouchStart={igniteFire}
    >
      <video
        ref={videoRef}
        className={`flame-video ${lit ? "lit" : ""}`}
        src={fireVideo}
        loop
        playsInline
      />

      <audio
        ref={audioRef}
        src={fireSound}
        loop
        preload="auto"
      />

      {!lit && (
        <div className="flame-text">
         " IGNITE "
        </div>
      )}

      {lit && (
        <div className="flame-quote">
          🔥 Asli swaad, zinda aag par
        </div>
      )}
    </div>
  );
};

export default FlameLoader;
