import mongoose from "mongoose";

// const commentSchema = new mongoose.Schema({
//   body: String,
//   userId: String,
//   firstName: String,
// });
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        username: {
          type: String,
          required: true,
        },
        userpicture: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        }

      }
    ]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
