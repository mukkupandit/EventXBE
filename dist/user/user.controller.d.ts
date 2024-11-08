import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Event } from '../event/event.entity';
import { JwtService } from '@nestjs/jwt';
import { MailSender } from '../mailSender';
export declare class UserController {
    private readonly userRepository;
    private readonly eventRepository;
    private jwtService;
    private mailSender;
    constructor(userRepository: Repository<User>, eventRepository: Repository<Event>, jwtService: JwtService, mailSender: MailSender);
    signup(userData: any): Promise<{
        message: string;
        data?: User;
        statusCode: number;
    }>;
    login(credentials: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        access_token?: string;
        data?: any;
        statuscode: number;
    }>;
    getUserById(id: number): Promise<{
        message: string;
        data?: User;
        statusCode: number;
    }>;
    getAllUsers(): Promise<{
        message: string;
        data?: User[];
        statusCode: number;
    }>;
    updateUserProfile(id: number, userData: any): Promise<{
        message: string;
        data?: User;
        statusCode: number;
    }>;
    deleteUser(id: number): Promise<{
        message: string;
        statusCode: number;
    }>;
    updateUserPassword(eventData: any): Promise<{
        statusCode: number;
        message: string;
        user: User;
    }>;
}
