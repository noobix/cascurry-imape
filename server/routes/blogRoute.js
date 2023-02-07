const express = require("express");
const {
  createBlog,
  updateBlog,
  getBlogPost,
  enumBlogs,
  deleteBlogs,
  likeBlog,
  disLikeBlog,
  addBlogAssets,
} = require("../controllers/blogController");
const { approveAuth, getPrivileges } = require("../middlewares/authMiddleware");
const { upload, blogImageFormat } = require("../middlewares/uploadImages");

const router = express.Router();
router.post("/new_blog_post", approveAuth, getPrivileges, createBlog);
router.put("/update_blog/:id", approveAuth, getPrivileges, updateBlog);
router.get("/fetch_blog/:id", getBlogPost);
router.get("/fetch_blog_all", enumBlogs);
router.put(
  "/blog_assets/upload_image/:id",
  approveAuth,
  getPrivileges,
  upload.array("images", 10),
  blogImageFormat,
  addBlogAssets
);
router.delete("/remove_blog/:id", approveAuth, getPrivileges, deleteBlogs);
router.put("/like_blog", approveAuth, likeBlog);
router.put("/unlike_blog", approveAuth, disLikeBlog);

module.exports = router;
