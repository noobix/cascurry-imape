import { ArrowDownOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  getMonthlyRevenue,
  getOrders,
  getYearlyCount,
} from "../feature/auth/authSlice";

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
    title: "Cont",
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    dataStreamMonthly = [],
    dataStreamYearly = [],
    user,
    orders = [],
  } = useSelector((state) => state.auth) ?? {};
  const [orderActivity, setorderActivity] = React.useState([]);
  const [stat1, setstat1] = React.useState([]);
  const [stat2, setstat2] = React.useState([]);
  React.useEffect(() => {
    let monthList = [
      "N/A",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const source =
      dataStreamMonthly &&
      dataStreamMonthly.map((stage) => {
        const monthName = stage._id.month
          ? monthList[parseInt(stage._id.month)]
          : "N/A";
        return { type: monthName, revenue: (stage.amount / 100).toFixed(2) };
      });
    setstat1(source);
    const reference =
      dataStreamMonthly &&
      dataStreamMonthly.map((stage) => {
        const month = stage._id.month;
        const monthName = month !== null ? monthList[parseInt(month)] : "N/A";
        return { type: monthName, sales: stage.count };
      });
    setstat2(reference);
    var recentOrders =
      orders &&
      orders.reduce(function (filtered, order) {
        if (order.orderStatus === "Not Processed") {
          var someNewValue = {
            key: order.id.slice(19),
            status: order.orderStatus.substring(0, 9) + "...",
            country: order.shippingInfo.country,
            customer:
              order.orderBy.firstname +
              " " +
              order.orderBy.lastname.substring(0, 6) +
              "...",
            date: new Date(order.paymentIntent.date).toLocaleDateString(),
            total: (order?.paymentIntent?.amountPaid / 100).toFixed(2),
          };
          filtered.push(someNewValue);
        }
        return filtered;
      }, []);
    setorderActivity(recentOrders);
  }, [dataStreamMonthly, orders]);
  React.useEffect(() => {
    dispatch(getMonthlyRevenue(user?.refreshToken));
    dispatch(getYearlyCount(user?.refreshToken));
    dispatch(getOrders(user?.refreshToken));
  }, [dispatch]);
  const ActivityChart = () => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Revenue and Order Statics",
        },
      },
    };
    const mergedData = [];
    const labels = [
      "N/A",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    for (let i = 1; i <= 12; i++) {
      const monthName = labels[i];
      mergedData.push({ type: monthName, revenue: 0, sales: 0 });
    }
    stat1.forEach((stage) => {
      const index = mergedData.findIndex((item) => item.type === stage.type);
      if (index !== -1) {
        mergedData[index].revenue = stage.revenue;
      }
    });
    stat2.forEach((stage) => {
      const index = mergedData.findIndex((item) => item.type === stage.type);
      if (index !== -1) {
        mergedData[index].sales = stage.sales;
      }
    });
    const data = {
      labels: mergedData.map((item) => item.type),
      datasets: [
        {
          label: "Revenue",
          data: mergedData.map((item) => item.revenue),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Orders",
          data: mergedData.map((item) => item.sales),
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    return (
      <Card style={{ width: "450", hieght: "850" }}>
        <Bar options={options} data={data} />
      </Card>
    );
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
          <h3 className="mb-4">Revenue Statics</h3>
          <div>
            <ActivityChart />
          </div>
        </div>
        <div className="mt-4 flex-grow-1">
          <h3 className="mb-4">Recent Orders</h3>
          <div>
            <Table columns={columns} dataSource={orderActivity} />
          </div>
        </div>
      </div>
      <div className="d-flex gap-3 justify-content-between">
        <h3 className="mb-4">Recent reviews</h3>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
