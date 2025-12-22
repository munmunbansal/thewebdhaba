import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FlameLoader from "./components/FlameLoader";
import Home from "./components/Home";
import MusicPage from "./components/MusicPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <FlameLoader />; // Loader covers full screen
  }

  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", width: "100%" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<MusicPage />} />
          
          {/* Optional fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;



// import { useState, useEffect } from "react"; 
// import FlameLoader from "./components/FlameLoader"; 
// import Home from './components/Home'; 
  

// function App() {
//    const [isLoading, setIsLoading] = useState(true); 
   
//     useEffect(() => { const timer = setTimeout(() => setIsLoading(false), 3000); 
  
//     return () => clearTimeout(timer); }, []); 
    
//     return ( 
//     <>
//      {isLoading ? (
//        <FlameLoader /> 
//      ) : (
//        <Home /> 
//         )} 
//         </> 
//         );
//        } 
//        export default App;


