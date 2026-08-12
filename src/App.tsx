import "./App.css";
import type React from "react";
import { Route, Routes } from "react-router";
import CoinCap from "./CoinCap";
import CoinDetails from "./CoinDetails";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<CoinCap />} />
        <Route path="/coins/:id" element={<CoinDetails />} />
      </Routes>
    </>
  );
};

export default App;
