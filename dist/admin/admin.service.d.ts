import { Repository } from 'typeorm';
import { Event } from '../event/event.entity';
export declare class AdminService {
    private readonly eventRepository;
    constructor(eventRepository: Repository<Event>);
    getEventsByType(type: string): Promise<{
        statusCode: number;
        message: string;
        data?: Event[];
        count?: number;
    }>;
    updateStatusEvent(id: number, event_status: boolean): Promise<{
        statusCode: number;
        message: string;
        event?: Event;
    }>;
}
