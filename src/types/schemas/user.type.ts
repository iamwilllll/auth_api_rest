export type UserT = {
    avatarUrl: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    otpCode: string;
    otpCodeExpiration: Date;
    verified: boolean;
};

export type UserWithOutPassT = Omit<UserT, 'password'>;
