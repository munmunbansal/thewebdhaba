import { useState, useEffect } from "react";
import FlameLoader from "./components/FlameLoader";
import Home from './components/Home'; // ✅ import Home

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000); // 3 sec loader
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <FlameLoader />
      ) : (
        <Home /> // ✅ use your home section here
      )}
    </>
  );
}

export default App;


