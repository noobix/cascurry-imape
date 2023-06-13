const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);
const { Converter } = require("easy-currencies");

const converter = new Converter();
const processCCPayment = asyncHandler(async (requestObject, responseObject) => {
  const partialMaskEmail = (s) =>
    s.replace(
      /(?<=(?<!\S)[^\s@]{2}(?:[^\s@]{4})*)[^\s@]{1,2}(?=[^\s@]*@)/g,
      (m) => "*".repeat(m.length)
    );
  const partialMaskMobile = (n) =>
    n.replace(/(\+\d{3}-?)(\d{3})\d*(\d{2})(\d{2})/, "$1$2***$3*$4");
  const customer = await stripe.customers.create({
    email: requestObject.body.cart.orderBy.email,
    name:
      requestObject.body.cart.orderBy.firstname +
      " " +
      requestObject.body.cart.orderBy.lastname,
    phone: requestObject.body.cart.orderBy.mobile,
    metadata: {
      systemId: requestObject.body.cart.orderBy._id,
      cartId: requestObject.body.cart._id,
      name:
        requestObject.body.cart.orderBy.firstname +
        " " +
        requestObject.body.cart.orderBy.lastname,
      email: partialMaskEmail(requestObject.body.cart.orderBy.email),
      mobile: partialMaskMobile(requestObject.body.cart.orderBy.mobile),
    },
  });
  const convertedPrice = async (item_cost) => {
    const bbq = await converter.convert(item_cost, "GHS", "USD");
    return bbq;
  };
  const cart_items = await Promise.all(
    requestObject.body.cart.product.map(async (item) => {
      const itemPrice = await convertedPrice(item.product.price);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.title,
            images: [item.product.images[0].image],
            description: item.product.category.name,
            metadata: {
              brand: item.product.brand.name,
              slug: item.product.slug,
            },
          },
          unit_amount: Math.ceil(itemPrice) * 100,
        },
        quantity: item.quantity,
      };
    })
  );

  const itsAccra = await converter.convert(75, "GHS", "USD");
  const isOutAccra = await converter.convert(129, "GHS", "USD");
  const iShipping = await converter.convert(661, "GHS", "USD");
  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    line_items: cart_items,
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: Math.ceil(itsAccra) * 100, currency: "usd" },
          display_name: "Standard Movement(Accra only)",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 3 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: Math.ceil(isOutAccra) * 100,
            currency: "usd",
          },
          display_name: "Standard Movement(Outside Accra)",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 4 },
            maximum: { unit: "business_day", value: 5 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: Math.ceil(iShipping) * 100, currency: "usd" },
          display_name: "International Movement",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 12 },
            maximum: { unit: "business_day", value: 15 },
          },
        },
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_BASE_URL}/payment-recieved`,
    cancel_url: `${process.env.CLIENT_BASE_URL}/cart`,
  });

  responseObject.send({ url: session.url, transaction: customer.id });
});

module.exports = { processCCPayment: processCCPayment };
