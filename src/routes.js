const express = require('express');
const devController = require('./controllers/DevController');
const likesController = require('./controllers/LikesController');
const dislikesController = require('./controllers/DislikesController');

const routes = express.Router();

routes.post('/devs', devController.store);
routes.post('/devs/:likedDevId/likes', likesController.store);
routes.post('/devs/:likedDevId/dislikes', dislikesController.store);
routes.get('/devs', devController.index);

module.exports = routes;