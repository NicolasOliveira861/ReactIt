import UserController from '../app/controllers/UserController';
import PostController from '../app/controllers/PostController';
import CommentController from '../app/controllers/CommentController';
import { Router } from 'express';

const routes = Router();

const Post = new PostController();
const Comment = new CommentController();
const User = new UserController();

// Users

routes.get('/users', User.index);
routes.get('/users/:id', User.showById);
routes.post('/users', User.store);
routes.patch('/users/:id', User.update);
routes.delete('/users/:id', User.delete);

// Posts
routes.get('/posts', Post.index);
routes.get('/posts/:id', Post.showById);
routes.post('/posts', Post.store);
routes.patch('/posts/:id', Post.update);
routes.delete('/posts/:id', Post.delete);

// Comments

routes.get('/comments', Comment.index);
routes.get('/comments/:id', Comment.showById);
routes.post('/comments', Comment.store);
routes.patch('/comments/:id', Comment.update);
routes.delete('/comments/:id', Comment.delete);

export default routes;
