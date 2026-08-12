import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { addInPortfel } from "./redux/portfelSlice";

const CoinDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const coin = useSelector((state: any) =>
    state.coins.coins.find((item: any) => item.id === id),
  );

  const formatter = new Intl.NumberFormat("ru-RU", {
    notation: "compact",
    compactDisplay: "short",
  });

  return (
    <>
      <img src={coin.image} alt={coin.name} width={64} height={64}></img>
      <h1>{coin.name}</h1>
      <div>
        <p>Введите количество:</p>
        <input></input>
        <button
          onClick={() => {
            dispatch(addInPortfel(coin));
          }}
        >
          Купить
        </button>
      </div>
      <p>Цена: {formatter.format(coin.current_price)}$</p>
      <p>
        Доступное предложение для торговли:{" "}
        {formatter.format(coin.circulating_supply)}
      </p>
      <p>Общее кол-во активов: {formatter.format(coin.total_supply)}</p>
      <p>
        Объём торгов за последние 24 часа: {formatter.format(coin.total_volume)}
      </p>
      <p>
        Средняя цена по объёму за последние 24 часа:{" "}
        {formatter.format(coin.current_price)}$
      </p>
      <p>
        Процентное изменение цены за последние 24 часа:{" "}
        {coin.price_change_percentage_24h}
      </p>
      <h1>ГРАФИК</h1>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Назад
      </button>
    </>
  );
};
export default CoinDetails;
