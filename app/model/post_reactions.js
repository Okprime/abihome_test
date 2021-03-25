const mongoose = require('mongoose');

const { Schema } = mongoose;

const postReactionSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user',
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'post',
  },
},
{
  timestamps: true,
});

const postReactionModel = mongoose.model('post_reaction', postReactionSchema);

module.exports = postReactionModel;
