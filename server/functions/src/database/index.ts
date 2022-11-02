import admin from 'firebase-admin';
import {
  client_email,
  project_id,
  private_key,
} from '../../serviceAccountKey.json';

export const initialize = () => {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: client_email,
      privateKey: private_key,
      projectId: project_id,
    }),
  });
};
