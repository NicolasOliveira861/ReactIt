import UsersRepository from 'app/repositories/UsersRepository';
import { Request, Response } from 'express';
import { ICreateUsers, IUpdateUsers } from 'typings/IUsers';
import { userValidators, validateJsonFields } from 'utils/checkJson';

const usersRepo = new UsersRepository();

export default class UserController {
  async index(req: Request, res: Response) {
    const users = await usersRepo.findAll();

    res.json(users);
  }

  async showById(req: Request, res: Response) {
    const { id } = req.params;

    const user = await usersRepo.findById(id);

    if (user.length === 0)
      return res.status(404).json({ error: 'User not found!' });

    return res.status(200).json(user);
  }

  async store(req: Request, res: Response) {
    const { ...data }: ICreateUsers = req.body;

    const haveAllFields = validateJsonFields({ ...data }, userValidators);

    if (!haveAllFields)
      return res.status(400).json({ error: 'All fields are required!' });

    //--- Email Validation ---//

    const isEmailBeingUsed = await usersRepo.findByEmail(data.email);

    if (isEmailBeingUsed.length > 0)
      return res
        .status(400)
        .json({ error: 'This e-mail is already being used!' });

    //--- Username validation ---//

    const isUsernameBeingUsed = await usersRepo.findByUsername(data.username);

    if (isUsernameBeingUsed.length > 0)
      return res
        .status(400)
        .json({ error: 'This username is already being used!' });

    const user = await usersRepo.create({ ...data });

    return res.json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { ...data }: IUpdateUsers = req.body;

    const userExists = await usersRepo.findById(id);

    if (userExists.length === 0)
      return res.status(404).json({ error: 'User not found!' });

    //--- Email Validation ---//

    if (data.email) {
      const isEmailBeingUsed = await usersRepo.findByEmail(data.email);

      if (isEmailBeingUsed.length > 0)
        return res
          .status(400)
          .json({ error: 'This e-mail is already being used!' });
    }

    //--- Username validation ---//

    if (data.username) {
      const isUsernameBeingUsed = await usersRepo.findByUsername(data.username);

      if (isUsernameBeingUsed.length > 0)
        return res
          .status(400)
          .json({ error: 'This username is already being used!' });
    }

    const user = await usersRepo.update(id, { ...data });

    return res.status(200).json(user);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await usersRepo.delete({ id });

    return res.status(200).json({ sucess: `User ${id} deleted!` });
  }
}
