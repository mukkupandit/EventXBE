import { Repository } from 'typeorm';
import { UserEvent } from './user-event.entity';
import { User } from '../user/user.entity';
import { Event } from '../event/event.entity';
export declare class UserEventService {
    private readonly userEventRepository;
    private readonly userRepository;
    private readonly eventRepository;
    constructor(userEventRepository: Repository<UserEvent>, userRepository: Repository<User>, eventRepository: Repository<Event>);
    registerUserToEvent(user_id: number, event_id: number): Promise<{
        message: string;
        data?: UserEvent;
        statusCode: number;
    }>;
    getUserEvents(user_id: number): Promise<{
        message: string;
        data?: any;
        statusCode: number;
    }>;
    getEventUsers(event_id: number): Promise<{
        message: string;
        data?: any;
        statusCode: number;
    }>;
}
