import type React from "react";
import Header from "./Header";
import BuyModal from "./BuyModal";
import TableComp from "./TableComp";

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
