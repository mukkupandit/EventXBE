import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { User } from '../user/user.entity';
import { UserEvent } from '../user-event/user-event.entity';
export declare class EventController {
    private readonly eventRepository;
    private readonly userRepository;
    private readonly userEventRepository;
    constructor(eventRepository: Repository<Event>, userRepository: Repository<User>, userEventRepository: Repository<UserEvent>);
    createEvent(eventData: any): Promise<{
        message: string;
        event?: Event;
        statusCode: number;
    }>;
    getEventById(id?: number, userId?: number): Promise<{
        message: string;
        data?: any[];
        statusCode: number;
    }>;
    deleteEventById(id: number): Promise<{
        message: string;
        statusCode: number;
    }>;
    updateEventById(id: number, eventData: any): Promise<{
        message: string;
        event?: Event;
        statusCode: number;
    }>;
    searchEvents(location?: string, name?: string, startDate?: string, endDate?: string): Promise<{
        message: string;
        data?: Event[];
        statusCode: number;
    }>;
    getUserEvents(userId: number): Promise<{
        message: string;
        data?: any[];
        statusCode: number;
    }>;
    getEventTypes(): Promise<{
        message: string;
        data?: string[];
        statusCode: number;
    }>;
}
