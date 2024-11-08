export declare class SignupDto {
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly password: string;
    readonly role: string;
}
export declare class LoginDto {
    readonly email: string;
    readonly password: string;
}
export declare class UpdateUserDto {
    readonly name?: string;
    readonly email?: string;
    readonly phone?: string;
    readonly age?: number;
    readonly image?: string;
}
