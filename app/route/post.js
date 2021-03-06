const express = require('express');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const controller = require('../controller/post');
const jwtVerify = require('../utilis/utils');

const post = express.Router();

post.use(bodyParser.json());
post.use(bodyParser.urlencoded({ extended: false }));

post.post('/post', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.savePost(req, res)));

post.get('/post/:id', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.getPost(req, res)));

post.put('/post/:id', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.updatePost(req, res)));

post.delete('/post/:id', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.deletePost(req, res)));

post.get('/post/:id/likes', asyncHandler((req, res) => controller.getAllLikes(req, res)));

post.post('/post/:id/likes', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.addLike(req, res)));

post.delete('/post/:id/likes', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.removeLike(req, res)));

module.exports = post;
