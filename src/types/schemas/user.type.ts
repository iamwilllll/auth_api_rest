export type UserT = {
    avatarUrl: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
};

export type UserWithOutPassT = Omit<UserT, 'password'>;
