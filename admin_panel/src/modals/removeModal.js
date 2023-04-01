import React from "react";
import { Modal } from "bootstrap";

const removeModal = () => {
  let modalWrapper = null;
  modalWrapper = document.createElement("div");
  modalWrapper.innerHTML = `<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="d-flex gap-15">
            <div>
                ...
            </div>
            <div></div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>

`;
  document.body.append(modalWrapper);
  let modal = new Modal(document.querySelector(".modal"));
  modal.show();
};

export default removeModal;
