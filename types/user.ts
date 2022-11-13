export type User = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  imgPath: string;
  createdAt: Date;
};

export type UserIdUsername = Pick<User, 'id' | 'username'>;
