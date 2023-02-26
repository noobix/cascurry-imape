const express = require("express");
const {
  addColor,
  getColor,
  updateColor,
  removeColor,
} = require("../controllers/colorController");
const { getPrivileges, approveAuth } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/add_color", approveAuth, getPrivileges, addColor);
router.get("/:name", getColor);
router.put("/:id", approveAuth, getPrivileges, updateColor);
router.delete("/:id", approveAuth, getPrivileges, removeColor);

module.exports = router;
