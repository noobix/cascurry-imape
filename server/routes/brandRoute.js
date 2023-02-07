const express = require("express");
const {
  enumBrand,
  removeBrand,
  findBrand,
  addbrand,
  editBrand,
} = require("../controllers/brandController");
const { approveAuth, getPrivileges } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/get_brands", enumBrand);
router.delete("/remove_brand/:id", approveAuth, getPrivileges, removeBrand);
router.get("/get_brand/:id", findBrand);
router.post("/add_brand", approveAuth, getPrivileges, addbrand);
router.post("/update_brand/:id", approveAuth, getPrivileges, editBrand);

module.exports = router;
