import express from 'express';
import bodyParser from 'body-parser';
import asyncHandler from 'express-async-handler';
import controller from '../controller/user';
import jwtVerify from '../utilis/utils';

const user = express.Router();

user.use(bodyParser.json());
user.use(bodyParser.urlencoded({ extended: false }));

user.post('/sign-up', asyncHandler((req, res) => controller.createAUser(req, res)));

user.post('/sign-in', asyncHandler((req, res) => controller.signIn(req, res)));

user.put('/update-user/:id',asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.updateUser(req, res)));

user.get('/user/:id', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.getUser(req, res)));

user.delete('/user/:id', asyncHandler((req, res, next) => jwtVerify(req, res, next)), asyncHandler((req, res) => controller.deleteUser(req, res)));


module.exports = user;
