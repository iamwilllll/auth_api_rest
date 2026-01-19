export type RegisterT = {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
};

export type LoginT = {
    email: string;
    password: string;
    rememberMe: boolean;
};
