export interface IUsers {
  id: string;
  name: string;
  username: string;
  email: string;
  date_of_birth: string;
  phone: string;
  is_admin: boolean;
  language: 'Portuguese' | 'English';
}

export interface ICreateUsers {
  name: string;
  username: string;
  email: string;
  date_of_birth: string;
  phone: string;
  is_admin: boolean;
  language: 'Portuguese' | 'English';
}

export interface IUpdateUsers {
  name?: string;
  username?: string;
  email?: string;
  date_of_birth?: string;
  phone?: string;
  language?: 'Portuguese' | 'English';
}

export interface IDeleteUsers {
  id: string;
}
