import { UserEventService } from './user-event.service';
export declare class UserEventController {
    private readonly userEventService;
    constructor(userEventService: UserEventService);
    registerUserToEvent(body: {
        user_id: number;
        event_id: number;
    }): Promise<{
        message: string;
        data?: import("./user-event.entity").UserEvent;
        statusCode: number;
    }>;
    getUserEvents(userId: string): Promise<{
        message: string;
        data?: any;
        statusCode: number;
    }>;
    getEventUsers(eventId: string): Promise<{
        message: string;
        data?: any;
        statusCode: number;
    }>;
}
