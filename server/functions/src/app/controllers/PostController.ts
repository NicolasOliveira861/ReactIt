import PostsRepository from '../repositories/PostsRepository';
import { Request, Response } from 'express';
import { ICreatePost, IUpdatePost } from '../../typings/IPosts';
import { postValidators, validateJsonFields } from '../../utils/checkJson';

const postsRepo = new PostsRepository();

export default class UserController {
  async index(req: Request, res: Response) {
    const posts = await postsRepo.findAll();

    res.json(posts);
  }

  async showById(req: Request, res: Response) {
    const { id } = req.params;

    const post = await postsRepo.findById(id);

    if (post.length === 0)
      return res.status(404).json({ error: 'Post not found!' });

    return res.status(200).json(post);
  }

  async store(req: Request, res: Response) {
    const { ...data }: ICreatePost = req.body;

    const haveAllFields = validateJsonFields({ ...data }, postValidators);

    if (!haveAllFields)
      return res.status(400).json({ error: 'All fields are required!' });

    const post = await postsRepo.create({ ...data });

    return res.json(post);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { ...data }: IUpdatePost = req.body;

    const postExists = await postsRepo.findById(id);

    if (postExists.length === 0)
      return res.status(404).json({ error: 'Post not found!' });

    const post = await postsRepo.update(id, { ...data });

    return res.status(200).json(post);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await postsRepo.delete({ id });

    return res.status(200).json({ sucess: `Post ${id} deleted!` });
  }
}
