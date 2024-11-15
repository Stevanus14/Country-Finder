import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListCountry from "./Pages/ListCountry";
import Cooperation from "./Pages/Cooperation";
import DetailCountry from "./Pages/DetailCountry";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListCountry />} />
        <Route path="/cooperation" element={<Cooperation />} />
        <Route path="/detailCountry/:id" element={<DetailCountry />} />
      </Routes>
    </Router>
  );
};

export default App;
