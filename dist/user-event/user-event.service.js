"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEventService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_event_entity_1 = require("./user-event.entity");
const user_entity_1 = require("../user/user.entity");
const event_entity_1 = require("../event/event.entity");
let UserEventService = class UserEventService {
    constructor(userEventRepository, userRepository, eventRepository) {
        this.userEventRepository = userEventRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }
    async registerUserToEvent(user_id, event_id) {
        const user = await this.userRepository.findOne({ where: { id: user_id } });
        if (!user) {
            return { statusCode: 422, message: `User with ID ${user_id} not found` };
        }
        const event = await this.eventRepository.findOne({ where: { id: event_id } });
        if (!event) {
            return { statusCode: 422, message: `Event with ID ${event_id} not found` };
        }
        const existingUserEvent = await this.userEventRepository.findOne({
            where: { user: { id: user_id }, event: { id: event_id } },
        });
        if (existingUserEvent) {
            return { statusCode: 409, message: `User with ID ${user_id} is already registered for event with ID ${event_id}` };
        }
        const userEvent = this.userEventRepository.create({ user, event });
        const savedUserEvent = await this.userEventRepository.save(userEvent);
        return { statusCode: 200, message: 'User registered to event successfully', data: savedUserEvent };
    }
    async getUserEvents(user_id) {
        const user = await this.userRepository.findOne({ where: { id: user_id } });
        delete user.password;
        if (!user) {
            return { statusCode: 422, message: `User with ID ${user_id} does not exist` };
        }
        const [userEvents, count] = await this.userEventRepository.findAndCount({
            where: { user: { id: user_id } },
            relations: ['event'],
        });
        if (count === 0) {
            return { statusCode: 422, message: `No events found for user with ID ${user_id}` };
        }
        const events = userEvents.map((userEvent) => userEvent.event);
        return {
            statusCode: 200,
            message: 'Events retrieved successfully',
            data: {
                users: user,
                event: events,
                totalUserCount: count,
            },
        };
    }
    async getEventUsers(event_id) {
        const event = await this.eventRepository.findOne({ where: { id: event_id } });
        if (!event) {
            return { statusCode: 422, message: `Event with ID ${event_id} does not exist` };
        }
        const [users, count] = await this.userEventRepository.findAndCount({
            where: { event: { id: event_id } },
            relations: ['user'],
        });
        if (count === 0) {
            return { statusCode: 422, message: `No users found for event with ID ${event_id}` };
        }
        const userData = users.map((userEvent) => {
            const user = userEvent.user;
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                age: user.age,
                image: user.image,
                created_at: user.created_at,
                updated_at: user.updated_at,
            };
        });
        return {
            statusCode: 200,
            message: 'Users retrieved successfully',
            data: {
                event: event,
                users: userData,
                totalUserCount: count,
            },
        };
    }
};
exports.UserEventService = UserEventService;
exports.UserEventService = UserEventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_event_entity_1.UserEvent)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserEventService);
//# sourceMappingURL=user-event.service.js.map