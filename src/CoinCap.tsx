import type React from "react";
import Header from "./Header";
import BuyModal from "./BuyModal";
import TableComp from "./TableComp";

const CoinCap: React.FC = () => {
  return (
    <>
      <Header />
      <hr></hr>
      <TableComp />
      <BuyModal />
    </>
  );
};

export default CoinCap;
