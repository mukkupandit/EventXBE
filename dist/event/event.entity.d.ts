import { UserEvent } from '../user-event/user-event.entity';
export declare class Event {
    id: number;
    user_id: number;
    event_name: string;
    email: string;
    phone: string;
    location: string;
    trending: boolean;
    registration_fee: number;
    event_start_date: Date;
    event_end_date: Date;
    description: string;
    user_type: string;
    status: boolean;
    event_type: string;
    image: string;
    created_at: Date;
    updated_at: Date;
    userEvents: UserEvent[];
}
