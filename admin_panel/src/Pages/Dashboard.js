import { ArrowDownOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React from "react";
import { Column } from "@ant-design/plots";

const columns = [
  {
    title: "Order Id",
    dataIndex: "key",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Co",
    dataIndex: "country",
  },
  {
    title: "Customer",
    dataIndex: "customer",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Total",
    dataIndex: "total",
  },
];
const table_data = [];
for (let i = 0; i < 46; i++) {
  table_data.push({
    key: i,
    status: "pending",
    country: "UK",
    customer: "Kieth John",
    date: "01-02-23",
    total: `${i}00`,
  });
}
const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "Jul",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sep",
      sales: 38,
    },
    {
      type: "Oct",
      sales: 38,
    },
    {
      type: "Nov",
      sales: 38,
    },
    {
      type: "Dec",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  return (
    <React.Fragment>
      <div className="d-flex justify-content-between align-items-center gap-4">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white rounded-3 p-4">
          <div>
            <p className="title">Total Sales</p>
            <h4 className="mb-0 amount">&#36;1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="gadge">
              <ArrowDownOutlined className="fs-6" />
              32&#37;
            </h6>
            <p className="mb-0 data">Compared to December 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white rounded-3 p-4">
          <div>
            <p className="title">Average Order Value</p>
            <h4 className="mb-0 amount">&#36;1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="gadge">
              <ArrowDownOutlined className="fs-6" />
              32&#37;
            </h6>
            <p className="mb-0 data">Compared to December 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white rounded-3 p-4">
          <div>
            <p className="title">Total Orders</p>
            <h4 className="mb-0 amount">&#36;1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="gadge">
              <ArrowDownOutlined className="fs-6" />
              32&#37;
            </h6>
            <p className="mb-0 data">Compared to December 2022</p>
          </div>
        </div>
      </div>
      <div className="d-flex gap-3 justify-content-between">
        <div className="mt-4 flex-grow-1">
          <h3 className="mb-4">Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1">
          <h3 className="mb-4">Recent Orders</h3>
          <div>
            <Table columns={columns} dataSource={table_data} />
          </div>
        </div>
      </div>
      <div className="my-4">
        <h3 className="mb-4">Recent reviews</h3>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
