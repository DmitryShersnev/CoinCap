import React from "react";

import caseImg from "../assets/case.png";
import { open } from "../redux/portfelSlice";
import PortfelModal from "./PortfelModal";
import { formatter } from "../helpers/formatter";
import type { Coin } from "../redux/coinsSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import type { CoinsInPortfel } from "../redux/portfelSlice";

const Header: React.FC = () => {
  const coins = useAppSelector((state) => state.coins.coins);
  const portfel = useAppSelector((state) => state.portfel.coinsInPortfel);
  const total = portfel.reduce(
    (acc: number, item: CoinsInPortfel) =>
      acc + item.current_price * item.amount,
    0,
  );

  const dispatch = useAppDispatch();

  const popular: Coin[] = coins.slice(0, 3);

  return (
    <>
      <div className="header-container">
        <div className="popular-coins">
          <p className="popular-title">Популярные криптовалюты:</p>
          <div className="coins-row">
            {popular.map((item: Coin) => {
              return (
                <div key={item.id} className="coin-item">
                  <p className="coin-name">{item.name}</p>
                  <p className="coin-price">
                    {formatter.format(item.current_price)} $
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="portfel"
          onClick={() => {
            dispatch(open());
          }}
        >
          <div className="portfel-icon">
            <img
              src={caseImg}
              alt={"Портфель"}
              width={50}
              height={50}
              style={{ filter: "brightness(0) invert(1)" }}
            ></img>
          </div>
          <div className="total">
            <p>Итого:</p>
            <p style={{ color: "#ea3dc8" }}>{formatter.format(total)} $</p>
          </div>
        </div>
      </div>
      <PortfelModal />
    </>
  );
};

export default Header;
