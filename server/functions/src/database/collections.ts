import admin from 'firebase-admin';

const db = admin.firestore();

const UsersCollection = db.collection('Users');
const PostsCollection = db.collection('Posts');
const CommentsCollection = db.collection('Comments');

export { UsersCollection, CommentsCollection, PostsCollection };
