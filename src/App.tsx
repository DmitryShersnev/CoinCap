import "./App.css";
import type React from "react";
import { Route, Routes } from "react-router";
import CoinCap from "./pages/CoinCap";
import CoinDetails from "./pages/CoinDetails";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/CoinCap" element={<CoinCap />} />
        <Route path="/coins/:id" element={<CoinDetails />} />
      </Routes>
    </>
  );
};

export default App;
