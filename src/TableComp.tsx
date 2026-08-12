import React from "react";
import { Table } from "antd";
import { useEffect } from "react";
import { getCoins } from "./redux/coinsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

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
  },
  {
    title: "Name",
    width: 100,
    dataIndex: "name",
    key: "name",
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
  },
  {
    title: "",
    key: "plus",
    fixed: "end",
    width: 100,
    render: () => <button>+</button>,
  },
];

const TableComp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coins = useSelector((state: any) => state.coins.coins);

  const formatter = new Intl.NumberFormat("ru-RU", {
    notation: "compact",
    compactDisplay: "short",
  });

  useEffect(() => {
    dispatch(getCoins());
  }, []);

  const dataSourse = coins.map((item: any, index: number) => ({
    key: item.id,
    id: item.id,
    market_cap_rank: item.market_cap_rank,
    symbol: item.symbol.toUpperCase(),
    name: item.name,
    vwap: `${formatter.format(item.current_price)}$`,
    price_change_24h: item.price_change_percentage_24h,
    market_cap: formatter.format(item.market_cap),
    current_price: `${formatter.format(item.current_price)}$`,
  }));

  const onRow = (record: any) => {
    return {
      onClick: () => navigate(`/coins/${record.id}`),
    };
  };

  return (
    <Table
      columns={columns}
      dataSource={dataSourse}
      onRow={onRow}
      rowKey="name"
    />
  );
};
export default TableComp;
