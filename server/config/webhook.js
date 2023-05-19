const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

const endpointSecret = process.env.STRIP_EVENTS_ENDPOINT_SECRET_TEST;
const StripeListener = asyncHandler(async (requestObject, responseObject) => {
  const sig = requestObject.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      requestObject.body,
      sig,
      endpointSecret
    );
  } catch (err) {
    responseObject.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      const customerSucceed = await stripe.customers.retrieve(
        paymentIntentSucceeded.customer
      );
      const orderSucceed = await Order.findOne({
        cartInfo: customerSucceed.metadata.cartId,
      });
      orderSucceed.paymentIntent.paymentStatus = "processed";
      orderSucceed.paymentIntent.statusInformation =
        "Payment Details accepted by provider";
      orderSucceed.paymentIntent.transactionId =
        paymentIntentSucceeded.customer;
      orderSucceed.paymentIntent.amountPaid =
        paymentIntentSucceeded.amount_received;
      const cartData = await Cart.findById(customerSucceed.metadata.cartId);
      cartData.status = "closed";
      await Promise.all([cartData.save(), orderSucceed.save()]);
      break;

    case "payment_intent.payment_failed":
      const paymentIntentFailed = event.data.object;
      const customerDeclined = await stripe.customers.retrieve(
        paymentIntentFailed.customer
      );
      const orderFailed = await Order.findOne({
        cartInfo: customerDeclined.metadata.cartId,
      });
      orderFailed.paymentIntent.paymentStatus = "declined";
      orderFailed.paymentIntent.statusInformation =
        "Payment Details declined by provider";
      await orderFailed.save();
      break;

    case "payment_intent.processing":
      const paymentIntentProcessing = event.data.object;
      const customerProcessing = await stripe.customers.retrieve(
        paymentIntentProcessing.customer
      );
      const orderProcessing = await Order.findOne({
        cartInfo: customerProcessing.metadata.cartId,
      });
      orderProcessing.paymentIntent.statusInformation =
        "Customer payment transaction processing";
      await orderProcessing.save();
      break;

    case "payment_intent.created":
      const paymentIntentCreated = event.data.object;
      const customerCreated = await stripe.customers.retrieve(
        paymentIntentCreated.customer
      );
      const orderCreated = await Order.findOne({
        cartInfo: customerCreated.metadata.cartId,
      });
      orderCreated.paymentIntent.paymentStatus = "created";
      orderCreated.paymentIntent.statusInformation =
        "Payment Details Submitted to provider";
      await orderCreated.save();
      break;

    case "charge.succeeded":
      const chargeSucceeded = event.data.object;
      const customerCharged = await stripe.customers.retrieve(
        chargeSucceeded.customer
      );
      const orderCharged = await Order.findOne({
        cartInfo: customerCharged.metadata.cartId,
      });
      orderCharged.paymentIntent.statusInformation =
        "Customer charged successfully";
      orderCharged.paymentIntent.amountPaid = chargeSucceeded.amount_received;
      await orderCharged.save();
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  // Return a 200 response to acknowledge receipt of the event
  responseObject.send();
});

module.exports = StripeListener;
