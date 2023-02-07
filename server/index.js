const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const dotenv = require("dotenv").config();
const connectDatabse = require("./config/database");
const brandRouter = require("./routes/brandRoute");
const blogRouter = require("./routes/blogRoute");
const authRouter = require("./routes/authRoute");
const couponRouter = require("./routes/couponRoute");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const { approveAuth, getPrivileges } = require("./middlewares/authMiddleware");
const {
  blogImageFormat,
  productImageFormat,
} = require("./middlewares/uploadImages");
const runb = require("./autoDelete");

// console.log(dotenv);
setInterval(() => "runb", 3600000);
const server = express();
const port = process.env.PORT || 4000;
connectDatabse();
server.use(morgan("common"));
server.use(cookieParser());
server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended: false }));

server.use("/api/users", authRouter);
server.use("/api/products/stock", productRouter);
server.use("/api/products/category", categoryRouter);
server.use("/api/products/brand", brandRouter);
server.use("/api/products/coupons", couponRouter);
server.use("/api/users/blog", blogRouter);

server.use(getPrivileges);
server.use(errorHandler);
server.use(approveAuth);
server.use(notFound);
server.use(blogImageFormat);
server.use(productImageFormat);

server.listen(port, () => console.log("server is engaged on port " + port));
