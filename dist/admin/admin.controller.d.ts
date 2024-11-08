import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getEventsByType(type: string): Promise<{
        statusCode: number;
        message: string;
        data?: import("../event/event.entity").Event[];
        count?: number;
    }>;
    updateStatusEvent(eventData: any): Promise<{
        statusCode: number;
        message: string;
        event?: import("../event/event.entity").Event;
    }>;
}
