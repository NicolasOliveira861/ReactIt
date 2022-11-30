import { CommentsCollection } from '../../database/collections';
import {
  ICreateComment,
  IDeleteComment,
  IUpdateComment,
} from '../../typings/IComments';
import { v4 } from 'uuid';

export default class CommentsRepository {
  async findAll() {
    const snapshot = await CommentsCollection.get();
    const response: FirebaseFirestore.DocumentData[] = [];

    snapshot.forEach((doc) => response.push({ id: doc.id, ...doc.data() }));

    return response;
  }

  async findById(id: string) {
    const snapshot = await CommentsCollection.where('id', '==', id).get();
    const response: FirebaseFirestore.DocumentData[] = [];

    if (snapshot.empty) return response;

    snapshot.forEach((doc) => response.push({ id: doc.id, ...doc.data() }));

    return response;
  }

  async create({ ...comment }: ICreateComment) {
    const commentId = v4();

    await CommentsCollection.doc(commentId).set({ ...comment });

    return {
      commentId,
      ...comment,
    };
  }

  async delete({ id }: IDeleteComment) {
    const deleteOperation = await CommentsCollection.doc(id).delete();

    return deleteOperation;
  }

  async update(id: string, { ...data }: IUpdateComment) {
    await CommentsCollection.doc(id).update({
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
