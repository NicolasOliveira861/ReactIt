import CommentsRepository from 'app/repositories/CommentsRepository';
import { Request, Response } from 'express';
import { ICreateComment, IUpdateComment } from 'typings/IComments';
import { commentValidators, validateJsonFields } from 'utils/checkJson';

const commentsRepo = new CommentsRepository();

export default class UserController {
  async index(req: Request, res: Response) {
    const comments = await commentsRepo.findAll();

    res.json(comments);
  }

  async showById(req: Request, res: Response) {
    const { id } = req.params;

    const comment = await commentsRepo.findById(id);

    if (comment.length === 0)
      return res.status(404).json({ error: 'Comment not found!' });

    return res.status(200).json(comment);
  }

  async store(req: Request, res: Response) {
    const { ...data }: ICreateComment = req.body;

    const haveAllFields = validateJsonFields({ ...data }, commentValidators);

    if (!haveAllFields)
      return res.status(400).json({ error: 'All fields are required!' });

    const comment = await commentsRepo.create({ ...data });

    return res.json(comment);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { ...data }: IUpdateComment = req.body;

    const commentExists = await commentsRepo.findById(id);

    if (commentExists.length === 0)
      return res.status(404).json({ error: 'Comment not found!' });

    const comment = await commentsRepo.update(id, { ...data });

    return res.status(200).json(comment);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await commentsRepo.delete({ id });

    return res.status(200).json({ sucess: `Comment ${id} deleted!` });
  }
}
