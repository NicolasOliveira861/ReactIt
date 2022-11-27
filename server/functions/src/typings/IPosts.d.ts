export interface IPosts {
  id: string;
  user_id: string;
  title: string;
  content: string;
  language: 'Portuguese' | 'English';
  created_at: string;
}

export interface ICreatePost {
  user_id: string;
  title: string;
  content: string;
  language: 'Portuguese' | 'English';
}

export interface IUpdatePost {
  title?: string;
  content?: string;
  language?: 'Portuguese' | 'English';
}

export interface IDeletePost {
  id: string;
}
