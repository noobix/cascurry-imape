const express = require("express");
const { processCCPayment } = require("../controllers/paymentController");
const { approveAuth } = require("../middlewares/authMiddleware");
const listener = require("../config/webhook");

const router = express.Router();
router.post("/credit_card/stripe", approveAuth, processCCPayment);
router.post(
  "/stripe_events/webhook",
  express.raw({ type: "application/json" }),
  listener
);

module.exports = router;
