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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("../event/event.entity");
let AdminService = class AdminService {
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    async getEventsByType(type) {
        const currentDate = new Date();
        let events = [];
        switch (type) {
            case 'past':
                events = await this.eventRepository.find({
                    where: [
                        { event_start_date: (0, typeorm_2.LessThan)(currentDate), event_end_date: (0, typeorm_2.LessThan)(currentDate) },
                    ],
                });
                break;
            case 'upcoming':
                events = await this.eventRepository.find({
                    where: [
                        { event_start_date: (0, typeorm_2.MoreThan)(currentDate), event_end_date: (0, typeorm_2.MoreThan)(currentDate) },
                    ],
                });
                break;
            case 'trending':
                events = await this.eventRepository.find({
                    where: [
                        { trending: true, event_start_date: (0, typeorm_2.MoreThanOrEqual)(currentDate), event_end_date: (0, typeorm_2.MoreThanOrEqual)(currentDate) },
                    ],
                });
                break;
            case 'all':
                events = await this.eventRepository.find();
                break;
            default:
                return { statusCode: common_1.HttpStatus.BAD_REQUEST, message: 'Invalid event type' };
        }
        const count = events.length;
        if (count > 0) {
            return { statusCode: common_1.HttpStatus.OK, message: 'Events found successfully', data: events, count: count };
        }
        else {
            return { statusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY, message: 'No data found', count: count };
        }
    }
    async updateStatusEvent(id, event_status) {
        try {
            const event = await this.eventRepository.update(id, { "status": event_status });
            let updatedEvent = await this.eventRepository.findOne({
                where: { id: id }
            });
            console.log(updatedEvent);
            return { statusCode: 200, message: 'Event status updated successfully', event: updatedEvent };
        }
        catch (error) {
            throw new common_1.HttpException('Error updating event', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map