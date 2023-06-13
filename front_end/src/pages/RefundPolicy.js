import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import MetaData from "../components/MetaData";

const RefundPolicy = () => {
  return (
    <React.Fragment>
      <MetaData title="Refund Policy" />
      <BreadCrumb title="refund-policy" />
      <Container classProp="policy-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <img
                src="https://www.ecrspune.com/images/cancellation.jpg"
                alt="..."
                className="img-fluid"
              />
              <div className="refund-policy">
                <h1>Refund Policy</h1>
                <h2>1. Customer Happiness Guarantee</h2>
                <p>
                  Your satisfaction is our top priority. If you're not
                  completely happy with your purchase, we're here to make it
                  right. We offer a flexible refund policy to ensure your
                  shopping experience is as joyful as riding a unicorn.
                </p>
                <h2>2. Eligibility for Refunds</h2>
                <p>To be eligible for a refund, please ensure that:</p>
                <ul>
                  <li>
                    The item is in its original condition, unopened, and unused.
                  </li>
                  <li>
                    The request for a refund is made within [X
                    days/weeks/months] of receiving the item.
                  </li>
                  <li>
                    You provide proof of purchase, such as the order number or
                    receipt.
                  </li>
                </ul>
                <h2>3. Refund Process</h2>
                <p>To initiate a refund, please follow these steps:</p>
                <ol>
                  <li>
                    Contact our customer support team via email or phone to
                    request a refund.
                  </li>
                  <li>
                    Provide the necessary details, including your order number
                    and reason for the refund.
                  </li>
                  <li>
                    Our support team will review your request and guide you
                    through the refund process.
                  </li>
                  <li>
                    Once your refund is approved, we will process it within [X
                    business days].
                  </li>
                  <li>
                    The refunded amount will be credited back to your original
                    payment method.
                  </li>
                </ol>
                <h2>4. Non-Refundable Items</h2>
                <p>
                  While we strive to accommodate all refund requests, certain
                  items are non-refundable:
                </p>
                <ul>
                  <li>Gift cards and vouchers</li>
                  <li>Downloadable software or digital products</li>
                  <li>Perishable goods, such as food or flowers</li>
                  <li>Custom-made or personalized items</li>
                </ul>
                <h2>5. Shipping and Return Costs</h2>
                <p>
                  If the return is due to a faulty or damaged item, we will
                  cover the return shipping costs. In other cases, the customer
                  is responsible for the return shipping expenses.
                </p>
                <h2>6. Exchanges</h2>
                <p>
                  We currently do not offer direct exchanges. If you need a
                  different item, please follow the refund process and place a
                  new order for the desired item.
                </p>
                <h2>7. Our Commitment</h2>
                <p>
                  We are committed to ensuring your satisfaction. If you have
                  any questions or need further assistance, please{" "}
                  <a href="mailto:support@ecommercesolution.com">
                    contact our support team
                  </a>
                  . We're here to help!
                </p>
                <h2>8. Updates and Changes</h2>
                <p>
                  We may update or modify our Refund Policy from time to time to
                  reflect changes in our business practices or legal
                  requirements. We recommend checking this page periodically for
                  any updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default RefundPolicy;
