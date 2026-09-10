import React from "react";
import { deleteInPortfel } from "../redux/portfelSlice";
import { Modal } from "antd";

import { close } from "../redux/portfelSlice";
import { Table } from "antd";
import { formatter } from "../helpers/formatter";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import type { CoinsInPortfel } from "../redux/portfelSlice";
import type { ColumnsType } from "antd/es/table";
import { portfelCalculator } from "../helpers/portfelCalculator";

type PortfelRow = {
  id: string;
  name: string;
  current_price: string;
  amount: number;
  sum: string;
};

const PortfelModal: React.FC = () => {
  const isOpen = useAppSelector((state) => state.portfel.isOpen);
  const dispatch = useAppDispatch();

  const portfel = useAppSelector((state) => state.portfel.coinsInPortfel);
  const liveCoins = useAppSelector((state) => state.coins.coins);

  const { totalNew, diff, percentDiff } = portfelCalculator(portfel, liveCoins);

  const columns: ColumnsType<PortfelRow> = [
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
      render: (_: any, record: PortfelRow) => (
        <button
          className="deleteButton"
          onClick={() => dispatch(deleteInPortfel(record.id))}
        >
          ❌
        </button>
      ),
    },
  ];

  const dataSourse: PortfelRow[] = portfel.map((item: CoinsInPortfel) => {
    const liveCoin = liveCoins.find((c) => c.id === item.id);
    const currentPrice = liveCoin ? liveCoin.current_price : item.current_price;

    return {
      id: item.id,
      name: item.name,
      current_price: `${formatter.format(currentPrice)}$`,
      amount: item.amount,
      sum: `${formatter.format(currentPrice * item.amount)}$`,
    };
  });

  const handleCancel = () => {
    dispatch(close());
  };

  const sign = diff >= 0 ? "+" : "";
  const diffColor = diff >= 0 ? "#22c55e" : "#ef4444";

  return (
    <>
      <Modal
        closable={{ "aria-label": "Custom Close Button" }}
        open={isOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <h2>Портфель</h2>

        <Table columns={columns} dataSource={dataSourse} rowKey="id" />

        <h3>
          Итого: {formatter.format(totalNew)}${" "}
          <span style={{ color: diffColor }}>
            {sign}
            {diff.toFixed(2)}$ ({sign}
            {percentDiff.toFixed(2)}%)
          </span>
        </h3>
      </Modal>
    </>
  );
};

export default PortfelModal;
