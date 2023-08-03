import Hero from "./Components/Hero";
import Leaderboard from "./Components/Leaderboard";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/" element={<Hero />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
