export interface ITokenModel {
    token: string;
    loginId: string;
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
    [key: string]: string;
}
