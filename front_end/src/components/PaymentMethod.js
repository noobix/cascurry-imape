import React from "react";
import { Modal } from "bootstrap";
import { makeCartOrder } from "../features/auth/authSlice";
import { makeCCpayment } from "../features/payment/paymentSlice";

const PaymentMethod = (values, user, cart, dispatch) => {
  let modalWrapper = null;
  let order = null;
  if (modalWrapper !== null) {
    modalWrapper.remove();
  }
  modalWrapper = document.createElement("div");
  modalWrapper.innerHTML = `<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Payment Method</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>
          <div class= d-flex align-items-center gap-15>
            <div>
              <div class="d-flex gap-10 align-items-center">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" value="Cheque" id="flexRadioDefault1">
                  <label class="form-check-label mb-0" for="flexRadioDefault1">
                    Pay with Cheque
                  </label>
                </div>
                <img class="img-fluid" width=55 height=35 src="https://img.favpng.com/7/6/23/cheque-bank-payment-transaction-account-clip-art-png-favpng-0A1FLXczPKa7ETjZjrc2P6NQd.jpg" alt="..."/>
              </div>
              <div class="d-flex gap-10 align-items-center">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" value="Voucher" id="flexRadioDefault2">
                  <label class="form-check-label mb-0" for="flexRadioDefault2">
                    Pay with Voucher
                  </label>
                </div>
                <img class="img-fluid" width=55 height=35 src="https://cdn.icon-icons.com/icons2/1577/PNG/512/3615751-banknote-cash-cheque-money-order-payment-voucher_107903.png" alt="..."/>
              </div>
              <div class="d-flex gap-10 align-items-center">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" value="Credit Card" id="flexRadioDefault3">
                  <label class="form-check-label mb-0" for="flexRadioDefault3">
                    Credit Card
                  </label>
                </div>
                <img class="img-fluid" width=55 height=35 src="https://w7.pngwing.com/pngs/42/677/png-transparent-credit-card-computer-icons-visa-payment-card-icon-free-s-credit-card-angle-text-rectangle.png" alt="..."/>
              </div>
            </div>
            <div>
              <div class="d-flex gap-10 align-items-center">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" value="Cash On Delivery" id="flexRadioDefault4">
                  <label class="form-check-label mb-0" for="flexRadioDefault4">
                    Cash On Delivery
                  </label>
                </div>
                <img class="img-fluid" width=50 height=30 src="https://static.thenounproject.com/png/3309439-200.png" alt="..."/>
              </div>
              <div class="d-flex gap-10 align-items-center">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" value="MoMo On Delivery" id="flexRadioDefault5">
                  <label class="form-check-label mb-0" for="flexRadioDefault5">
                    MoMo On Delivery
                  </label>
                </div>
                <img class="img-fluid" width=45 height=35 src="https://cdn-icons-png.flaticon.com/512/4874/4874294.png" alt="..."/>
              </div>
              <div class="d-flex gap-10 align-items-center">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" value="MoMo At Checkout" id="flexRadioDefault6">
                  <label class="form-check-label mb-0" for="flexRadioDefault6">
                    MoMo At Checkout
                  </label>
                </div>
                <img class="img-fluid" width=45 height=40 src="https://cdn-icons-png.flaticon.com/512/3069/3069394.png" alt="..."/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary btn-resolved" data-bs-dismiss="modal">Proceed</button>
      </div>
    </div>
  </div>
</div>

`;
  const radioBtns = modalWrapper.querySelectorAll(
    "input[name='flexRadioDefault']"
  );
  radioBtns.forEach((btn) =>
    btn.addEventListener("change", () => {
      let selected = modalWrapper.querySelector(
        "input[name='flexRadioDefault']:checked"
      ).value;
      order = { paymentIntent: { method: selected }, shippingInfo: values };
    })
  );
  modalWrapper.querySelector(".btn-resolved").onclick = () => {
    dispatch(makeCartOrder({ token: user.refreshToken, data: order }));
    order.paymentIntent.method === "Credit Card" &&
      dispatch(makeCCpayment({ token: user.refreshToken, data: cart }));
  };
  document.body.append(modalWrapper);
  let modal = new Modal(document.querySelector(".modal"));
  modal.show();
};

export default PaymentMethod;
