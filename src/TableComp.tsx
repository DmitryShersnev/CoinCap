import React from "react";
import { Table } from "antd";
import { useEffect } from "react";
import { getCoins, type Coin } from "./redux/coinsSlice";
import { useNavigate } from "react-router";
import { openBuyModal } from "./redux/buyModalSlice";
import { formatter } from "./helpers/formatter";
import { useAppDispatch, useAppSelector } from "./redux/hooks/hooks";
import type { TableProps } from "antd";

type TableCoinDataType = {
  key: string;
  id: string;
  market_cap_rank: number;
  symbol: string;
  name: string;
  vwap: string;
  price_change_24h: number;
  market_cap: string;
  current_price: string;
  originalCoin: Coin;
};

const TableComp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const coins = useAppSelector((state) => state.coins.coins);
  const loading = useAppSelector((state) => state.coins.loading);

  const columns: TableProps<TableCoinDataType>["columns"] = [
    {
      title: "№",
      width: 20,
      dataIndex: "market_cap_rank",
      key: "market_cap_rank",
    },
    {
      title: "Symbol",
      width: 20,
      dataIndex: "symbol",
      key: "symbol",
      render: (text: string) => (
        <span style={{ color: "#ea3dc8", fontWeight: "bold" }}>{text}</span>
      ),
    },
    {
      title: "Name",
      width: 100,
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span style={{ fontWeight: "bold" }}>{text}</span>
      ),
    },
    {
      title: "VWAP (24Hr)",
      dataIndex: "vwap",
      key: "vwap",
      width: 100,
    },
    {
      title: "Change (24Hr)",
      dataIndex: "price_change_24h",
      key: "price_change_24h",
      width: 100,
      render: (value: number) => {
        const isPositive = value >= 0;
        return (
          <span
            style={{
              color: isPositive ? "#22c55e" : "#ef4444",
              fontWeight: "bold",
            }}
          >
            {isPositive ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`}
          </span>
        );
      },
    },
    {
      title: "Market Cap",
      dataIndex: "market_cap",
      key: "market_cap",
      width: 100,
    },
    {
      title: "Price",
      dataIndex: "current_price",
      key: "current_price",
      width: 100,
      render: (text: string) => (
        <span style={{ fontWeight: "bold" }}>{text}</span>
      ),
    },
    {
      title: "",
      key: "plus",
      fixed: "end",
      width: 100,
      render: (_, record) => (
        <button
          className="addButton"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(openBuyModal(record.originalCoin));
          }}
        >
          ➕
        </button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getCoins());
  }, [dispatch]);

  const dataSourse: TableCoinDataType[] = coins.map((item: Coin) => ({
    key: item.id,
    id: item.id,
    market_cap_rank: item.market_cap_rank,
    symbol: item.symbol.toUpperCase(),
    name: item.name,
    vwap: `${formatter.format(item.current_price)} $`,
    price_change_24h: item.price_change_percentage_24h,
    market_cap: formatter.format(item.market_cap),
    current_price: `${formatter.format(item.current_price)} $`,
    originalCoin: item,
  }));

  const onRow: TableProps<TableCoinDataType>["onRow"] = (record) => {
    return {
      onClick: () => navigate(`/coins/${record.id}`),
    };
  };

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSourse}
        onRow={onRow}
        rowKey="id"
      />
    </>
  );
};
export default TableComp;
