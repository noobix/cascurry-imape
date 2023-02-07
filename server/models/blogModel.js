const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    decription: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numberOfViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    images: {
      type: Array,
      required: true,
      default:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik." +
        "com%2Ffree-vector%2Fblogging-fun-content-creation-online-streaming" +
        "-video-blog-young-girl-making-selfie-social-network-sharing-feedback" +
        "-self-promotion-strategy-vector-isolated-concept-metaphor-" +
        "illustration_335657-855.jpg%3Fw%3D2000&imgrefurl=https%3A%2F%2Fwww" +
        ".freepik.com%2Ffree-photos-vectors%2Fblogging&tbnid=e3LWL_CrAVddoM&vet" +
        "=12ahUKEwjh7piV__L8AhVooScCHYS3A3IQMygBegUIARDdAQ.." +
        "i&docid=QE5flp-NuuI7tM&w=2000&h=2000&q=blog%20images&client=" +
        "firefox-b-d&ved=2ahUKEwjh7piV__L8AhVooScCHYS3A3IQMygBegUIARDdAQ",
    },
    author: {
      type: String,
      default: "Admin",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

//Export the model
module.exports = mongoose.model("Blog", blogSchema);
