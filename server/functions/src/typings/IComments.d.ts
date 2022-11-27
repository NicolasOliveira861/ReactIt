export interface IComments {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  replies: IComments[];
}

export interface ICreateComment {
  user_id: string;
  content: string;
}

export interface IUpdateComment {
  content?: string;
}

export interface IDeleteComment {
  id: string;
}
