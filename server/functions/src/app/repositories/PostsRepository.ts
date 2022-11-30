import { PostsCollection } from '../../database/collections';
import { ICreatePost, IDeletePost, IUpdatePost } from '../../typings/IPosts';
import { v4 } from 'uuid';

export default class UsersRepository {
  async findAll() {
    const snapshot = await PostsCollection.get();
    const response: FirebaseFirestore.DocumentData[] = [];

    snapshot.forEach((doc) => response.push({ id: doc.id, ...doc.data() }));

    return response;
  }

  async findById(id: string) {
    const snapshot = await PostsCollection.where('id', '==', id).get();
    const response: FirebaseFirestore.DocumentData[] = [];

    if (snapshot.empty) return response;

    snapshot.forEach((doc) => response.push({ id: doc.id, ...doc.data() }));

    return response;
  }

  async findByUserId(userId: string) {
    const snapshot = await PostsCollection.where('user_id', '==', userId).get();
    const response: FirebaseFirestore.DocumentData[] = [];

    if (snapshot.empty) return response;

    snapshot.forEach((doc) => response.push({ id: doc.id, ...doc.data() }));

    return response;
  }

  async findByLanguage(language: string) {
    const snapshot = await PostsCollection.where(
      'language',
      '==',
      language
    ).get();
    const response: FirebaseFirestore.DocumentData[] = [];

    if (snapshot.empty) return response;

    snapshot.forEach((doc) => response.push({ id: doc.id, ...doc.data() }));

    return response;
  }

  async create({ ...post }: ICreatePost) {
    const postId = v4();

    await PostsCollection.doc(postId).set({ ...post });

    return {
      postId,
      ...post,
    };
  }

  async delete({ id }: IDeletePost) {
    const deleteOperation = await PostsCollection.doc(id).delete();

    return deleteOperation;
  }

  async update(id: string, { ...data }: IUpdatePost) {
    await PostsCollection.doc(id).update({
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
