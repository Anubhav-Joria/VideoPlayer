import "./App.css";
import Navbar from "./components/Navbar";
import CardArea from "./components/CardArea";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import Edit from "./components/Edit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<CardArea />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
