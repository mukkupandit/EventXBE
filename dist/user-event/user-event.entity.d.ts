import { User } from '../user/user.entity';
import { Event } from '../event/event.entity';
export declare class UserEvent {
    id: number;
    user: User;
    event: Event;
    registered_at: Date;
    created_at: Date;
    updated_at: Date;
}
