import type React from "react";
import { useSelector, useDispatch } from "react-redux";
import caseImg from "./assets/case.png";
import { open } from "./redux/portfelSlice";
import ModalPortfel from "./ModalPortfel";

const Header: React.FC = () => {
  const coins = useSelector((state: any) => state.coins.coins);
  const portfel = useSelector((state: any) => state.portfel.coinsInPortfel);
  const total = portfel.reduce(
    (acc: any, item: any) => acc + item.current_price * item.amount,
    0,
  );

  const dispatch = useDispatch();

  const popular = coins.slice(0, 3);

  return (
    <>
      <div>
        <p>Популярные криптовалюты:</p>
        {popular.map((item: any) => {
          return (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>{item.current_price}</p>
            </div>
          );
        })}
      </div>
      <div
        onClick={() => {
          dispatch(open());
        }}
      >
        <img src={caseImg} alt={"Портфель"} width={64} height={64}></img>
        <h3>Итого: {total}</h3>
      </div>
      <ModalPortfel />
    </>
  );
};

export default Header;
