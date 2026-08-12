import React, { useState } from "react";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { close } from "./redux/portfelSlice";
import { Table } from "antd";

const ModalPortfel: React.FC = () => {
  const isOpen = useSelector((state: any) => state.portfel.isOpen);
  const dispatch = useDispatch();
  const portfel = useSelector((state: any) => state.portfel.coinsInPortfel);
  const total = portfel.reduce(
    (acc: any, item: any) => acc + item.current_price * item.amount,
    0,
  );

  const columns = [
    {
      title: "Название",
      width: 20,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Цена",
      width: 20,
      dataIndex: "current_price",
      key: "current_price",
    },
    {
      title: "Количество",
      width: 20,
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Итого",
      width: 20,
      dataIndex: "sum",
      key: "sum",
    },
    {
      title: "",
      key: "delete",
      fixed: "end",
      width: 100,
      render: () => <button>❌</button>,
    },
  ];

  const dataSourse = portfel.map((item: any) => ({
    name: item.name,
    current_price: item.current_price,
    amount: item.amount,
    sum: item.current_price * item.amount,
  }));

  const handleOk = () => {
    dispatch(close());
  };

  const handleCancel = () => {
    dispatch(close());
  };

  return (
    <>
      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h2>Портфель</h2>

        <Table columns={columns} dataSource={dataSourse} />
        <h3>Итого: {total}</h3>
      </Modal>
    </>
  );
};

export default ModalPortfel;
