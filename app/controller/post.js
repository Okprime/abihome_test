/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const postService = require('../service/post');
const { postSchema, reactionSchema } = require('../schema/post');
const postModel = require('../model/post');
const postReactionModel = require('../model/post_reactions');

module.exports = {
  async savePost(req, res) {
    let messageBody;
    let result;
    try {
      // validate request body
      await postSchema.validateAsync(req.body);
      req.body.user_id = req.decoded._id;

      result = await postService.savePost(req.body);
      console.log('result', result);

      if (result.result === null) {
        console.log('Internal server error');
        messageBody = 'Internal server error';
        return res.status(500).send({
          error: true,
          code: 500,
          message: messageBody,
        });
      }
      return res.status(201).send({
        error: false,
        code: 201,
        message: 'Successfully saved post',
        data: result,
      });
    } catch (error) {
      console.log('error', error.details[0]);
      return res.status(400).send({
        message: `${error.details[0].message.replace(/['"]+/g, '')}.`,
        status: 'error',
        data: null,
      });
    }
  },

  async getPost(req, res) {
    const { id } = req.params;

    const postData = await postService.getPost(id);
    console.log('user successfully fetched');
    return res.status(200).send({
      error: false,
      code: 200,
      message: 'post successfully fetched',
      data: postData,
    });
  },

  async updatePost(req, res) {
    const { id } = req.params;

    const result = await postService.updatePost(req.body, id);
    console.log('result from update', result);
    if (result === null) {
      console.log('post not found');
      return res.status(404).send({
        error: true,
        code: 400,
        message: 'post not found',
      });
    }
    return res.status(200).send({
      error: false,
      code: 200,
      message: 'post data has been updated',
      data: result,
    });
  },

  async deletePost(req, res) {
    const { id } = req.params;

    // add an extra parameter to the getOneData() in the post service
    const thirdParam = 'Yes';

    const isPostExist = await postService.getOneData(postModel, id, thirdParam);
    console.log('isPostExist', isPostExist);

    if (isPostExist) {
      const postData = await postService.deletePost(id);
      console.log('post successfully deleted');
      return res.status(200).send({
        error: false,
        code: 200,
        message: 'post successfully deleted',
        data: postData,
      });
    }
    console.log('post not found');
    return res.status(404).send({
      error: true,
      code: 404,
      message: 'post not found',
    });
  },

  async getAllLikes(req, res) {
    console.log('reqq', req.decoded);
    try {
      // validate request body
      await reactionSchema.validateAsync(req.params);

      // check if a user has already liked a post
      const data = await postService.getAllLikes({
        post_id: mongoose.Types.ObjectId(req.params.id),
      });

      return res.status(200).send({
        error: false,
        code: 200,
        message: 'Data successfully fetched',
        data,
      });
    } catch (error) {
      console.log('error', error.details[0]);
      return res.status(400).send({
        message: `${error.details[0].message.replace(/['"]+/g, '')}.`,
        status: 'error',
        data: null,
      });
    }
  },

  async addLike(req, res) {
    let messageBody;
    let result;
    try {
      // validate the request body
      await reactionSchema.validateAsync(req.params);

      const payload = {
        user_id: req.decoded._id,
        post_id: req.params.id,
      };

      // check if a user has already liked a post and also if a post exist
      const [isLiked, postExist] = await Promise.all([
        postService.getOneData(postReactionModel, {
          user_id: req.decoded._id,
          post_id: mongoose.Types.ObjectId(req.params.id),
        }),
        postService.getOneData(postModel, {
          _id: mongoose.Types.ObjectId(req.params.id),
        }),
      ]);

      if (!postExist) {
        return res.status(400).send({
          error: true,
          code: 400,
          message: 'Post does not exist',
        });
      }
      if (isLiked) {
        return res.status(400).send({
          error: true,
          code: 400,
          message: 'You already liked this post',
        });
      }

      result = await postService.addLike(payload);
      console.log('result', result);

      if (result.result === null) {
        console.log('Internal server error');
        messageBody = 'Internal server error';
        return res.status(500).send({
          error: true,
          code: 500,
          message: messageBody,
        });
      }
      return res.status(201).send({
        error: false,
        code: 201,
        message: messageBody,
        data: result,
      });
    } catch (error) {
      console.log('error', error.details[0]);
      return res.status(400).send({
        message: `${error.details[0].message.replace(/['"]+/g, '')}.`,
        status: 'error',
        data: null,
      });
    }
  },

  async removeLike(req, res) {
    let messageBody;
    let result;
    try {
      // validate the request body
      await reactionSchema.validateAsync(req.params);

      const payload = {
        user_id: req.decoded._id,
        post_id: req.params.id,
      };

      // check if a user has already liked a post and if a post exist
      const [isLiked, postExist] = await Promise.all([
        postService.getOneData(postReactionModel, {
          user_id: req.decoded._id,
          post_id: mongoose.Types.ObjectId(req.params.id),
        }),
        postService.getOneData(postModel, {
          _id: mongoose.Types.ObjectId(req.params.id),
        }),
      ]);

      if (!postExist) {
        return res.status(400).send({
          error: true,
          code: 400,
          message: 'Post does not exist',
        });
      }
      if (!isLiked) {
        return res.status(400).send({
          error: true,
          code: 400,
          message: 'You have not liked this post',
        });
      }

      result = await postService.removeLike(payload);
      console.log('result', result);

      if (result.result === null) {
        console.log('Internal server error');
        messageBody = 'Internal server error';
        return res.status(500).send({
          error: true,
          code: 500,
          message: messageBody,
        });
      }
      return res.status(201).send({
        error: false,
        code: 201,
        message: 'Successfully unliked this post',
        data: result,
      });
    } catch (error) {
      console.log('error', error.details[0]);
      return res.status(400).send({
        message: `${error.details[0].message.replace(/['"]+/g, '')}.`,
        status: 'error',
        data: null,
      });
    }
  },
};
