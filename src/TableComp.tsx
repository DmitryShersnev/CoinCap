import React from "react";
import { Table } from "antd";
import { useEffect } from "react";
import { getCoins } from "./redux/coinsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { openBuyModal } from "./redux/buyModalSlice";
import { formatter } from "./helpers/formatter";

const TableComp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coins = useSelector((state: any) => state.coins.coins);

  const columns = [
    {
      title: "№",
      width: 20,
      dataIndex: "market_cap_rank",
      key: "market_cap_rank",
    },
    {
      title: "symbol",
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
      render: (_: any, record: any) => (
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
    console.log("запрос на сервер");
  }, []);

  const dataSourse = coins.map((item: any, index: number) => ({
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

  const onRow = (record: any) => {
    return {
      onClick: () => navigate(`/coins/${record.id}`),
    };
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSourse}
        onRow={onRow}
        rowKey="id"
      />
    </>
  );
};
export default TableComp;
