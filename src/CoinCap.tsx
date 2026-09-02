import type React from "react";
import Header from "./Header";
import BuyModal from "./BuyModal";
import TableComp from "./TableComp";

import { useAppSelector } from "./redux/hooks/hooks";

const CoinCap: React.FC = () => {
  const loading = useAppSelector((state) => state.coins.loading);

  // if (loading) {
  //   return <h1>Загрука...</h1>;
  // }
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
