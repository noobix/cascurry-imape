import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";

const ShippingPolicy = () => {
  return (
    <React.Fragment>
      <MetaData title="Shipping Policy" />
      <BreadCrumb title="shipping-policy" />
      <Container classProp="policy-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <img
                src="https://www.scmart.in/wp-content/uploads/2022/10/Shipping-Policy_banner-min.jpg"
                alt="..."
                className="img-fluid"
              />
              <div className="shipping-policy">
                <h1>Shipping Policy</h1>
                <h2>1. Order Processing Time</h2>
                <p>
                  All orders are processed within 1-3 business days. We strive
                  to ship your items as quickly as possible to ensure you
                  receive them in a timely manner.
                </p>
                <h2>2. Shipping Methods</h2>
                <p>
                  We offer various shipping methods to accommodate your needs:
                </p>
                <ul>
                  <li>
                    <span class="highlight">Standard In-city Shipping:</span>{" "}
                    Estimated delivery time is 2-3 business days.
                  </li>
                  <li>
                    <span class="highlight">Standard Local Shipping:</span>{" "}
                    Estimated delivery time is 4-5 business days.
                  </li>
                  <li>
                    <span class="highlight">International Shipping:</span>{" "}
                    Estimated delivery time is 12 business day.
                  </li>
                </ul>
                <h2>3. Shipping Rates</h2>
                <p>
                  Shipping rates are calculated based on the total weight of
                  your order and the shipping destination. The exact shipping
                  cost will be displayed during the checkout process.
                </p>
                <h2>4. Order Tracking</h2>
                <p>
                  Once your order has been shipped, you will receive a
                  confirmation email with a tracking number. You can use this
                  tracking number to track the progress of your shipment.
                </p>
                <h2>5. International Shipping</h2>
                <p>
                  We currently offer international shipping to select countries.
                  Please note that international shipments may be subject to
                  customs duties, taxes, or import fees imposed by the
                  destination country. The customer is responsible for any
                  additional charges incurred.
                </p>
                <h2>6. Shipping Address</h2>
                <p>
                  Please ensure that the shipping address provided during
                  checkout is accurate and complete. We are not responsible for
                  any delays or issues caused by incorrect or incomplete
                  addresses.
                </p>
                <h2>7. Shipping Restrictions</h2>
                <p>
                  Some items may have shipping restrictions due to legal or
                  logistical reasons. If an item is not eligible for shipping to
                  your location, you will be notified during the checkout
                  process.
                </p>
                <h2>8. Lost or Damaged Shipments</h2>
                <p>
                  In the rare event that your shipment is lost or damaged during
                  transit, please{" "}
                  <a href="mailto:support@ecommercesolution.com">
                    contact our customer support
                  </a>{" "}
                  immediately. We will work with the shipping carrier to resolve
                  the issue and ensure you receive a satisfactory resolution.
                </p>
                <h2>9. Contact Us</h2>
                <p>
                  If you have any further questions or need assistance regarding
                  our shipping policy, please don't hesitate to{" "}
                  <a href="mailto:support@ecommercesolution.com">
                    contact our customer support team
                  </a>
                  . We're here to help!
                </p>
                <h2>10. Updates and Changes</h2>
                <p>
                  We reserve the right to update or modify our Shipping Policy
                  at any time. Any changes will be effective immediately upon
                  posting on our website. We recommend reviewing this policy
                  periodically to stay informed about our shipping practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default ShippingPolicy;
