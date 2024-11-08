import { UserEvent } from '../user-event/user-event.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    age: number;
    image: string;
    created_at: Date;
    updated_at: Date;
    userEvents: UserEvent[];
}
