const express = require("express");
const {
  addCategory,
  editCategory,
  removeCategory,
  findCategory,
  enumCategory,
} = require("../controllers/categoryController");
const { approveAuth, getPrivileges } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/add_new", approveAuth, getPrivileges, addCategory);
router.put("/update_category/:id", approveAuth, getPrivileges, editCategory);
router.delete(
  "/delete_category/:id",
  approveAuth,
  getPrivileges,
  removeCategory
);
router.get("/get_category/:id", findCategory);
router.get("/list_categories", enumCategory);

module.exports = router;
