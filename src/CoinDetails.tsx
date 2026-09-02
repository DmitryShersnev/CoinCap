import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addInPortfel } from "./redux/portfelSlice";
import { useState } from "react";
import { formatter } from "./helpers/formatter";
import Grafic from "./Grafic";

import type { ChangeEvent } from "react";
import type { Coin } from "./redux/coinsSlice";
import { useAppSelector } from "./redux/hooks/hooks";

const CoinDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [numberOfCoin, setNumberOfCoin] = useState(0);

  const coin = useAppSelector((state) =>
    state.coins.coins.find((item: Coin) => item.id === id),
  );

  if (!coin) {
    return <h2>Монета не найдена</h2>;
  }

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberOfCoin(Number(e.target.value));
  };

  const handleClickBuy = () => {
    if (numberOfCoin > 0) {
      dispatch(addInPortfel({ amount: numberOfCoin, coin }));
      setNumberOfCoin(1);
      navigate(-1);
    }
  };

  return (
    <>
      <div className="coinDetails-container">
        <div className="coinDetails-name">
          <img src={coin.image} alt={coin.name} width={64} height={64}></img>
          <h1>{coin.name}</h1>
        </div>
        <div className="addCoin">
          <p>Введите количество:</p>
          <input
            placeholder={"Введите количество"}
            type={"number"}
            min={1}
            onChange={inputChange}
          ></input>
          <button onClick={handleClickBuy}>Купить</button>
        </div>
        <div className="coinPrice">
          <h2>Цена:</h2>
          <h2 style={{ color: "#ea3dc8" }}>
            {formatter.format(coin.current_price)} $
          </h2>
        </div>
        <p>
          Доступное предложение для торговли:{" "}
          {formatter.format(coin.circulating_supply)}
        </p>
        <p>Общее кол-во активов: {formatter.format(coin.total_supply)}</p>
        <p>
          Объём торгов за последние 24 часа:{" "}
          {formatter.format(coin.total_volume)}
        </p>
        <p>
          Средняя цена по объёму за последние 24 часа:{" "}
          {formatter.format(coin.current_price)} $
        </p>
        <p>
          Процентное изменение цены за последние 24 часа:{" "}
          {coin.price_change_percentage_24h}
        </p>
        <div className="grafic-container">
          <Grafic coin={coin} />
        </div>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Назад
        </button>
      </div>
    </>
  );
};
export default CoinDetails;
