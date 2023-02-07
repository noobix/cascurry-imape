const asyncHandler = require("express-async-handler");
const validateId = require("../utils/validateId");
const uploadToCloudinay = require("../utils/cloudinary");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");

const createBlog = asyncHandler(async (requestObject, responseObject) => {
  const { id } = await Category.findOne({ name: requestObject.body.category });
  const newBlog = await Blog.create({
    title: requestObject.body.title,
    decription: requestObject.body.decription,
    category: id,
  });
  if (!newBlog)
    throw new Error(
      "Something went wrong, unable to post you blog, please try again"
    );
  responseObject.status(201).json(newBlog);
});
const updateBlog = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const { id1 } = await Category.findOne({ name: requestObject.body.category });
  const update = await Blog.findByIdAndUpdate(
    id,
    {
      title: requestObject.body.title || undefined,
      decription: requestObject.body.decription || undefined,
      category: id1 || undefined,
    },
    { new: true, runValidators: true }
  );
  if (update) responseObject.status(200).json(update);
  else
    responseObject.status(417).json({
      message: "An error occurred while updating blog post please try again.",
    });
});
const getBlogPost = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const blog = await Blog.findById(id).populate("likes").populate("disLikes");
  const count = await Blog.findByIdAndUpdate(
    id,
    { $inc: { numberOfViews: 1 } },
    { new: true }
  );

  if (blog) responseObject.status(200).json(blog);
  else
    responseObject.status(204).json({
      message: "An error occurred while fetching blog post, please try again",
    });
});
const enumBlogs = asyncHandler(async (requestObject, responseObject) => {
  const blogs = await Blog.find().populate("likes").populate("disLikes");
  if (!blogs)
    throw new Error(
      "Something went wrong, May be connection interupted, please try again"
    );
  responseObject.status(200).json(blogs);
});
const deleteBlogs = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const blog = await Blog.findByIdAndRemove(id);
  if (!blog) responseObject.status(404).json({ message: "Couldn't find blog" });
  else responseObject.status(200).json(blog);
});
const likeBlog = asyncHandler(async (requestObject, responseObject) => {
  const blogId = requestObject.body.blogId;
  const blog = await Blog.findById(blogId);
  const user = requestObject.user._id;
  const prevousActionLiked = blog?.isLiked;
  const prevousActionDisLiked = blog?.disLikes.find(
    (userId) => userId.toString() === user.toString()
  );
  if (prevousActionDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { disLikes: user },
        isDisliked: false,
      },
      { new: true }
    );
    responseObject.status(200).json(blog);
  }
  if (prevousActionLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: user },
        isLiked: false,
      },
      { new: true }
    );
    responseObject.status(200).json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: user },
        isLiked: true,
      },
      { new: true }
    );
    responseObject.status(200).json(blog);
  }
});
const disLikeBlog = asyncHandler(async (requestObject, responseObject) => {
  const blogId = requestObject.body.blogId;
  const blog = await Blog.findById(blogId);
  const user = requestObject.user._id;
  const prevousActionDisLiked = blog?.isDisliked;
  const prevousActionLiked = blog?.likes.find(
    (userId) => userId.toString() === user.toString()
  );
  if (prevousActionLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: user },
        isLliked: false,
      },
      { new: true }
    );
    responseObject.status(200).json(blog);
  }
  if (prevousActionDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { disLikes: user },
        isDisliked: false,
      },
      { new: true }
    );
    responseObject.status(200).json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { disLikes: user },
        isDisliked: true,
      },
      { new: true }
    );
    responseObject.status(200).json(blog);
  }
});
const addBlogAssets = asyncHandler(async (requestObject, responseObject) => {
  const id = requestObject.params.id;
  const uploader = (path) => uploadToCloudinay(path, "images");
  const urls = new Array();
  const files = requestObject.files;
  for (const file of files) {
    const path = file.path;
    const newPath = await uploader(path);
    urls.push(newPath);
  }
  const blog = await Blog.findByIdAndUpdate(
    id,
    { images: urls.map((file) => file) },
    { new: true }
  );
  if (!blog)
    responseObject
      .status(417)
      .json({ message: "Blog images not updated, please try again" });
  else responseObject.status(200).json(blog);
});

module.exports = {
  createBlog: createBlog,
  updateBlog: updateBlog,
  getBlogPost: getBlogPost,
  enumBlogs: enumBlogs,
  deleteBlogs: deleteBlogs,
  likeBlog: likeBlog,
  disLikeBlog: disLikeBlog,
  addBlogAssets: addBlogAssets,
};
