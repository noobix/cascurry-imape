import {
  FileOutlined,
  UserOutlined,
  DashboardOutlined,
  OrderedListOutlined,
  AppstoreAddOutlined,
  MenuUnfoldOutlined,
  CrownOutlined,
  SlidersOutlined,
  BranchesOutlined,
  PicCenterOutlined,
  ChromeOutlined,
  CodepenCircleOutlined,
  MacCommandOutlined,
  NotificationOutlined,
  ProfileOutlined,
  FundProjectionScreenOutlined,
  BellOutlined,
  SnippetsOutlined,
  PlusSquareOutlined,
  GroupOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../feature/auth/authSlice";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("DashBoard", "", <DashboardOutlined />),
  getItem("Customers", "customers", <UserOutlined />),
  getItem("Catalogue", "catalogue", <OrderedListOutlined />, [
    getItem("Add Product", "add-item", <AppstoreAddOutlined />),
    getItem("Product List", "product-list", <MenuUnfoldOutlined />),
    getItem("Brand", "make", <CrownOutlined />),
    getItem("Brand List", "make-list", <SlidersOutlined />),
    getItem("Cartegory", "cartegory", <BranchesOutlined />),
    getItem("Cartegory List", "section-list", <PicCenterOutlined />),
    getItem("Color", "color", <ChromeOutlined />),
    getItem("Color List", "meta-list", <CodepenCircleOutlined />),
  ]),
  getItem("Orders", "orders", <MacCommandOutlined />),
  getItem("Blogs", "blogs", <NotificationOutlined />, [
    getItem("Blog", "add-blog", <AppstoreAddOutlined />),
    getItem("Blog List", "all-blogs", <ProfileOutlined />),
  ]),
  getItem("Coupons", "coupons", <SnippetsOutlined />, [
    getItem("Add Coupon", "add-coupon", <PlusSquareOutlined />),
    getItem("Coupon List", "coupon-list", <GroupOutlined />),
  ]),
  getItem("Enquiries", "enquiries", <FileOutlined />),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [pageName, setpageName] = React.useState("");
  const [notification, setnotification] = React.useState(0);
  const sidePath = location.pathname.split("/");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user, orders, isLoading } = useSelector((state) => state.auth);
  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem("user");
    setTimeout(() => navigate("/"), 500);
  }
  function verify() {
    if (user === null) return;
    if (user) {
      const { refreshToken } = user;
      const { exp } = jwt_decode(refreshToken, { header: true });
      const expirationTime = exp * 1000 - 60000;
      if (Date.now() >= expirationTime) {
        localStorage.removeItem("user");
        dispatch(logout());
        return false;
      } else return true;
    } else return false;
  }
  React.useEffect(() => {
    if (!user || verify() === false) {
      navigate("/");
    }
  }, []);
  React.useEffect(() => {
    setpageName(getPageTitle());
  }, [location]);
  React.useEffect(() => {
    const notification =
      orders &&
      orders.length > 0 &&
      orders.reduce((acc, order) => {
        if (order.orderStatus === "Not Processed") {
          return acc + 1;
        }
        return acc;
      }, 0);
    setnotification(notification);
  }, [orders]);
  const getPageTitle = () => {
    const { pathname } = location;
    const pageName = pathname.substring(1).split("/")[1] || "Admin";
    const capitalizedPageName =
      pageName.charAt(0).toUpperCase() + pageName.slice(1);
    return capitalizedPageName;
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
          className="text-white fs-5 text-center"
        >
          <span className="sm-logo">
            <FundProjectionScreenOutlined />
          </span>
          <span className="lg-logo">Online Store</span>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={items}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="d-flex justify-content-between pe-3"
        >
          <div className="header m-3">
            <h4>{pageName}</h4>
          </div>
          <div
            className="d-flex gap-3 align-items-center"
            style={{ lineHeight: "25px" }}
          >
            <div className="position-relative d-flex align-items-center m-3">
              <span className="badge bg-warning rounded-circle p-1 position-absolute z-1">
                {notification}
              </span>
              <BellOutlined className="fs-5 position-absolute" />
            </div>
            <img
              src="https://img.freepik.com/free-icon/user_318-462367.jpg?w=2000"
              alt="..."
              className="img-fluid rounded-3"
              style={{ width: "30px" }}
            />
            <div
              className="dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              id="dropDownMenuLink"
              aria-expanded="false"
            >
              <h5 className="mb-0">{user?.firstname}</h5>
              <p className="mb-0">{user?.email}</p>
            </div>
            <div className="dropdown-menu">
              <li>
                <Link
                  className="dropdown-item"
                  style={{ height: "auto", lineHeight: "20px" }}
                  to="/admin"
                >
                  View Profile
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  style={{ height: "auto", lineHeight: "20px" }}
                  to="/admin"
                >
                  Change Password
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  style={{ height: "auto", lineHeight: "20px" }}
                  to="https://open-market-sv2.netlify.app/"
                  onClick={handleLogout}
                >
                  Switch to client
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  style={{ height: "auto", lineHeight: "20px" }}
                  onClick={handleLogout}
                >
                  Signout
                </Link>
              </li>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            {sidePath.map((path, index) => (
              <Breadcrumb.Item key={index}>{path}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            theme="light"
          />
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
