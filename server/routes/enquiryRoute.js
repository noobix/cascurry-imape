const express = require("express");
const {
  makeEnquiry,
  updateEnquiry,
  deleteEnquiry,
  findEnquiry,
  enumEnquiry,
} = require("../controllers/enquiryController");
const { approveAuth, getPrivileges } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/make_enquiry", approveAuth, makeEnquiry);
router.get("/get_all_enquiry", enumEnquiry);
router.put("/update_enquiry/:id", approveAuth, getPrivileges, updateEnquiry);
router.delete("/delete_enquiry/:id", approveAuth, getPrivileges, deleteEnquiry);
router.get("/get_enquiry/:id", findEnquiry);

module.exports = router;
