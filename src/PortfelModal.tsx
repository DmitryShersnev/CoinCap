import React, { useState } from "react";
import { deleteInPortfel } from "./redux/portfelSlice";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { close } from "./redux/portfelSlice";
import { Table } from "antd";
import { formatter } from "./helpers/formatter";

const PortfelModal: React.FC = () => {
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
      render: (_: any, record: any) => (
        <button onClick={() => dispatch(deleteInPortfel(record.id))}>❌</button>
      ),
    },
  ];

  const dataSourse = portfel.map((item: any) => ({
    name: item.name,
    current_price: `${formatter.format(item.current_price)}$`,
    amount: item.amount,
    sum: `${formatter.format(item.current_price * item.amount)}$`,
    id: item.id,
  }));

  const handleCancel = () => {
    dispatch(close());
  };

  return (
    <>
      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <h2>Портфель</h2>

        <Table columns={columns} dataSource={dataSourse} />
        <h3>Итого: {formatter.format(total)} $</h3>
      </Modal>
    </>
  );
};

export default PortfelModal;
