import React from "react";
import Container from "../components/Container";
import { AiFillPrinter } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderCheckout } from "../features/auth/authSlice";

const PaymentRecieved = () => {
  const dispatch = useDispatch();
  const { user, order } = useSelector((state) => state.auth) ?? {};
  const [countdown, setCountdown] = React.useState(30);
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  React.useEffect(() => {
    if (countdown === 0)
      dispatch(
        fetchOrderCheckout({
          token: user.refreshToken,
          id: localStorage.getItem("transact"),
        })
      );
  }, [countdown]);
  function handlePrint(elementId, uniqueIframeId) {
    const content = document.getElementById(elementId);
    let pri;
    if (document.getElementById(uniqueIframeId)) {
      pri = document.getElementById(uniqueIframeId).contentWindow;
    } else {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("title", uniqueIframeId);
      iframe.setAttribute("id", uniqueIframeId);
      iframe.setAttribute(
        "style",
        "height: 0px; width: 0px; position: absolute;"
      );
      document.body.appendChild(iframe);
      pri = iframe.contentWindow;
    }
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  }
  return (
    <Container
      classProp="checkout-wrapper home-wrapper-2 pt-3"
      select="checkout-receipt"
    >
      <div className="row">
        <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/cart">Cart</Link>
            </li>
            &nbsp;/
            <li className="breadcrumb-item">
              <Link to="/shipping">Shipping</Link>
            </li>
            &nbsp;/
            <li className="breadcrumb-item active" aria-current="page">
              Payment
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12">
          {countdown > 0 && (
            <p className="text-danger">
              Processing Please wait: {countdown} seconds
            </p>
          )}
          {countdown < 0 && (
            <div
              className="pe-auto"
              style={{ cursor: "pointer" }}
              onClick={() => handlePrint("checkout-receipt")}
            >
              Print &nbsp;
              <i>
                <AiFillPrinter />
              </i>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="border-end border-3 border-secondary py-5">
            <h5 className="mb-3 text-decoration-underline">
              Shipping Information
            </h5>
            <div className="d-flex gap-3">
              <div>Name:</div>
              <div>
                {order && order?.shippingInfo?.firstname}{" "}
                {order && order?.shippingInfo?.lastname}
              </div>
            </div>
            <div className="d-flex gap-3">
              <div>Address 1:</div>
              <div>{order && order?.shippingInfo?.addressLine1}</div>
            </div>
            <div className="d-flex gap-3">
              <div>Address 2:</div>
              <div>{order && order?.shippingInfo?.addressLine2}</div>
            </div>
            <div className="d-flex gap-3">
              <div>City:</div>
              <div>{order && order?.shippingInfo?.city}</div>
            </div>
            <div className="d-flex gap-3">
              <div>State:</div>
              <div>{order && order?.shippingInfo?.state}</div>
            </div>
            <div className="d-flex gap-3">
              <div>ZipCode:</div>
              <div>{order && order?.shippingInfo?.zip}</div>
            </div>
            <div className="d-flex gap-3">
              <div>Country:</div>
              <div>{order && order?.shippingInfo?.country}</div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="d-flex flex-wrap align-items-center gap-2 py-5">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
              alt="..."
              width="45"
              height="25"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
              alt="..."
              width="45"
              height="25"
            />
            <img
              src="https://www.pngitem.com/pimgs/m/160-1603803_american-express-logotype-stacked-american-express-logo-png.png"
              alt="..."
              width="50"
              height="25"
            />
            <img
              src="https://seeklogo.com/images/U/unionpay-logo-D3F9908811-seeklogo.com.png"
              alt="..."
              width="60"
              height="35"
            />
            <img
              src="https://member.amcham.com.tw/image/cache/catalog/company/diners-club-taiwan-ltd-logo-031022-132822-500x239.png"
              alt="..."
              width="95"
              height="65"
            />
            <img
              src="https://www.eftposaustralia.com.au/sites/default/files/eftpos_Logo_Tagline_HOR_POS_RGB.png"
              alt="..."
              width="95"
              height="65"
            />
            <img
              src="https://www.thesportsgeek.com/app/uploads/2019/01/JCB-Logo1.png"
              alt="..."
              width="85"
              height="65"
            />
            <img
              src="https://www.hd-plus.com.gh/wp-content/uploads/2022/01/vcash.png"
              alt="..."
              width="130"
              height="80"
            />
            <img
              src="https://apimgmtstxgjpgteugmgtizh.blob.core.windows.net/content/MediaLibrary/images/MTNMomo-Logo.png"
              alt="..."
              width="150"
              height="80"
            />
            <img
              src="https://getoze.com/app/uploads/2022/11/airteltigo-new-logo_sqenLLu-3.png"
              alt="..."
              width="160"
              height="95"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="border-start border-3 border-secondary py-5 px-3">
            <h5 className="mb-3 text-decoration-underline">
              Billing Status Information
            </h5>
            <div className="d-flex gap-3 mb-1">
              <div>Payment Method:</div>
              <div>{order && order?.paymentIntent?.method}</div>
            </div>
            <div className="d-flex gap-3 mb-1">
              <div>Fingerprint:</div>
              <div>{order && order?.paymentIntent?.id}</div>
            </div>
            <div className="d-flex gap-3 mb-1">
              <div>Amount:</div>
              <div>
                &#8373;
                {order.paymentIntent &&
                  (order?.paymentIntent?.amount).toFixed(2)}
                &nbsp;
                <u>Shipping excluded</u>
              </div>
            </div>
            <div className="d-flex gap-3 mb-1">
              <div>Amount Paid:</div>
              <div>
                &#8373;
                {order.paymentIntent &&
                  (order?.paymentIntent?.amountPaid / 100).toFixed(2)}
              </div>
            </div>
            <div className="d-flex gap-3 mb-1">
              <div>Payment status:</div>
              <div>{order && order?.paymentIntent?.paymentStatus}</div>
            </div>
            <div className="d-flex gap-3 mb-1">
              <div>Order Status:</div>
              <div>{order && order?.orderStatus}</div>
            </div>
            <div className="d-flex gap-3 mb-1">
              <div>Delivery Date:</div>
              <div>
                {order && new Date(order?.deliveryDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PaymentRecieved;
