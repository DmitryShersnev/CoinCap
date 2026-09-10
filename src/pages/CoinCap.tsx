import type React from "react";
import Header from "../components/Header";
import BuyModal from "../components/BuyModal";
import TableComp from "../components/TableComp";

const CoinCap: React.FC = () => {
  return (
    <>
      <Header />

      <div className="table">
        <TableComp />
      </div>
      <BuyModal />
    </>
  );
};

export default CoinCap;
