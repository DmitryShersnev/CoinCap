import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { addInPortfel } from "../redux/portfelSlice";
import { closeBuyModal } from "../redux/buyModalSlice";
import { useAppSelector } from "../redux/hooks/hooks";

const BuyModal: React.FC = () => {
  const { buyModalIsOpen, selectedCoin } = useAppSelector(
    (state) => state.buyModal,
  );

  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);

  const handleCancel = () => {
    dispatch(closeBuyModal());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleClick = () => {
    if (!selectedCoin) return;
    if (amount > 0) {
      dispatch(addInPortfel({ amount, coin: selectedCoin }));
      setAmount(1);
      dispatch(closeBuyModal());
    }
  };

  return (
    <>
      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={buyModalIsOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <h2>Купить монету {selectedCoin ? selectedCoin.name : ""}</h2>
        <p>Введите количество</p>
        <input type="number" min={1} onChange={handleChange}></input>
        <button onClick={handleClick}>Добавить</button>
      </Modal>
    </>
  );
};

export default BuyModal;
