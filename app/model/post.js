const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    content: {
      type: String,
    },
    media: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const postModel = mongoose.model('post', postSchema);

module.exports = postModel;
