import { UsersCollection } from '../../database/collections';
import { ICreateUsers, IDeleteUsers, IUpdateUsers } from '../../typings/IUsers';
import { v4 } from 'uuid';

export default class UsersRepository {
  async findAll() {
    const snapshot = await UsersCollection.get();
    const response: FirebaseFirestore.DocumentData[] = [];

    snapshot.forEach((doc) => response.push({ id: doc.id, ...doc.data() }));

    return response;
  }

  async findById(id: string) {
    const snapshot = await UsersCollection.doc(id).get();

    if (!snapshot.exists) return null;

    return { id: snapshot.id, ...snapshot.data() };
  }

  async findByUsername(username: string) {
    const snapshot = await UsersCollection.where(
      'username',
      '==',
      username
    ).get();
    const response: FirebaseFirestore.DocumentData[] = [];

    if (snapshot.empty) return response;

    snapshot.forEach((doc) => response.push({ id: doc.id, ...doc.data() }));

    return response;
  }

  async findByEmail(email: string) {
    const snapshot = await UsersCollection.where('email', '==', email).get();
    const response: FirebaseFirestore.DocumentData[] = [];

    if (snapshot.empty) return response;

    snapshot.forEach((doc) => response.push({ id: doc.id, ...doc.data() }));

    return response;
  }

  async findByLanguage(language: string) {
    const snapshot = await UsersCollection.where(
      'language',
      '==',
      language
    ).get();
    const response: FirebaseFirestore.DocumentData[] = [];

    if (snapshot.empty) return response;

    snapshot.forEach((doc) => response.push({ id: doc.id, ...doc.data() }));

    return response;
  }

  async create({ ...user }: ICreateUsers) {
    const userId = v4();

    await UsersCollection.doc(userId).set({ ...user });

    return {
      userId,
      ...user,
    };
  }

  async delete({ id }: IDeleteUsers) {
    const deleteOperation = await UsersCollection.doc(id).delete();

    return deleteOperation;
  }

  async update(id: string, { ...data }: IUpdateUsers) {
    await UsersCollection.doc(id).update({
      ...data,
    });

    return {
      updated: {
        id,
        ...data,
      },
    };
  }
}
