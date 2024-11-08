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
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("./event.entity");
const user_entity_1 = require("../user/user.entity");
const Joi = require("joi");
const date_fns_1 = require("date-fns");
const event_swagger_1 = require("./event.swagger");
const auth_guard_1 = require("../user/auth.guard");
const user_event_entity_1 = require("../user-event/user-event.entity");
const fs = require("fs");
const path = require("path");
let EventController = class EventController {
    constructor(eventRepository, userRepository, userEventRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.userEventRepository = userEventRepository;
    }
    async createEvent(eventData) {
        const schema = Joi.object({
            user_id: Joi.number().required(),
            event_name: Joi.string().required(),
            location: Joi.string().required(),
            event_start_date: Joi.date().iso().required(),
            event_end_date: Joi.date().iso().required(),
            description: Joi.string().required(),
            registration_fee: Joi.number().required(),
            trending: Joi.boolean().required(),
            event_type: Joi.string().required(),
            image: Joi.string().optional()
        });
        const { error, value } = schema.validate(eventData);
        if (error) {
            return {
                statusCode: 400,
                message: error.details[0].message,
            };
        }
        const { user_id, event_name, event_start_date, event_end_date } = value;
        let user = await this.userRepository.findOne({ where: { id: user_id } });
        if (!user) {
            return {
                statusCode: 422,
                message: "User does not exist with this id.",
            };
        }
        const currentDate = new Date();
        const startDateTime = new Date(event_start_date);
        const endDateTime = new Date(event_end_date);
        if (!(0, date_fns_1.isValid)(startDateTime) || !(0, date_fns_1.isValid)(endDateTime)) {
            return {
                statusCode: 422,
                message: "Enter valid dates",
            };
        }
        if ((0, date_fns_1.isBefore)(startDateTime, (0, date_fns_1.startOfDay)(currentDate))) {
            return {
                statusCode: 422,
                message: "Event start date cannot be in the past",
            };
        }
        if ((0, date_fns_1.isBefore)(endDateTime, (0, date_fns_1.startOfDay)(currentDate))) {
            return {
                statusCode: 422,
                message: "Event end date cannot be in the past",
            };
        }
        if ((0, date_fns_1.isBefore)(endDateTime, startDateTime)) {
            return {
                statusCode: 422,
                message: "Event end date cannot be earlier than start date",
            };
        }
        const existingEvent = await this.eventRepository.findOne({
            where: { user_id, event_name, event_start_date: startDateTime },
        });
        if (existingEvent) {
            return { statusCode: 422, message: 'Event already exists' };
        }
        value.email = user.email;
        value.phone = user.phone;
        value.user_type = user.role;
        try {
            const savedEvent = await this.eventRepository.save(value);
            if (!savedEvent) {
                return { statusCode: 422, message: 'Event could not be saved', event: null };
            }
            return { statusCode: 200, message: 'Event saved successfully', event: savedEvent };
        }
        catch (error) {
            throw new common_1.HttpException('Error while saving event', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getEventById(id, userId) {
        if (id) {
            const event = await this.eventRepository.findOne({ where: { id } });
            if (!event) {
                return { statusCode: 422, message: 'No data found' };
            }
            let isRegister = false;
            if (userId) {
                const userEvent = await this.userEventRepository.findOne({
                    where: {
                        event: { id },
                        user: { id: userId }
                    },
                    relations: ['event', 'user'],
                });
                if (userEvent) {
                    isRegister = true;
                }
            }
            return {
                statusCode: 200,
                message: 'Event found successfully',
                data: [{ ...event, is_register: isRegister }]
            };
        }
        else {
            const events = await this.eventRepository.find();
            return { statusCode: 200, message: 'All events retrieved successfully', data: events };
        }
    }
    async deleteEventById(id) {
        const event = await this.eventRepository.findOne({ where: { id } });
        if (!event) {
            throw new common_1.HttpException('Event not found', common_1.HttpStatus.NOT_FOUND);
        }
        try {
            await this.eventRepository.remove(event);
            return { statusCode: 200, message: 'Event deleted successfully' };
        }
        catch (error) {
            throw new common_1.HttpException('Error deleting event', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateEventById(id, eventData) {
        const schema = Joi.object({
            event_name: Joi.string().optional(),
            location: Joi.string().optional(),
            event_start_date: Joi.date().iso().optional(),
            event_end_date: Joi.date().iso().optional(),
            description: Joi.string().optional(),
            user_type: Joi.string().optional(),
            status: Joi.string().optional(),
            registration_fee: Joi.number().optional(),
            trending: Joi.boolean().optional(),
            event_type: Joi.string().optional(),
            image: Joi.string().optional()
        });
        const { error, value } = schema.validate(eventData);
        if (error) {
            return {
                statusCode: 400,
                message: error.details[0].message,
            };
        }
        const { event_start_date, event_end_date } = value;
        const currentDate = new Date();
        if ((event_start_date && !(0, date_fns_1.isValid)(new Date(event_start_date))) || (event_end_date && !(0, date_fns_1.isValid)(new Date(event_end_date)))) {
            return {
                statusCode: 422,
                message: "Enter valid dates",
            };
        }
        if (event_start_date && (0, date_fns_1.isBefore)((0, date_fns_1.startOfDay)(new Date(event_start_date)), (0, date_fns_1.startOfDay)(currentDate))) {
            return {
                statusCode: 422,
                message: "Event start date cannot be in the past",
            };
        }
        if (event_end_date && event_start_date && (0, date_fns_1.isBefore)(new Date(event_end_date), new Date(event_start_date))) {
            return {
                statusCode: 422,
                message: "Event end date cannot be earlier than start date",
            };
        }
        const existingEvent = await this.eventRepository.findOne({
            where: { id },
        });
        if (!existingEvent) {
            return {
                statusCode: 404,
                message: 'Event not found',
            };
        }
        try {
            const updatedEvent = await this.eventRepository.save({ ...existingEvent, ...value });
            return { statusCode: 200, message: 'Event updated successfully', event: updatedEvent };
        }
        catch (error) {
            throw new common_1.HttpException('Error updating event', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async searchEvents(location, name, startDate, endDate) {
        const query = {};
        if (location) {
            query.location = location;
        }
        if (name) {
            query.event_name = (0, typeorm_2.ILike)(`%${name}%`);
        }
        if (startDate && endDate) {
            query.event_start_date = (0, typeorm_2.Between)(startDate, endDate);
        }
        const events = await this.eventRepository.find({
            where: query,
        });
        if (!events || events.length === 0) {
            return { statusCode: 422, message: 'No data found' };
        }
        return { statusCode: 200, message: 'Events found successfully', data: events };
    }
    async getUserEvents(userId) {
        if (!userId) {
            throw new common_1.HttpException('User ID is required', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const events = await this.eventRepository.find();
            const userEvents = await this.userEventRepository.find({ where: { user: { id: userId } }, relations: ['event'] });
            const userEventIds = userEvents.map(ue => ue.event.id);
            const response = events.map(event => ({
                ...event,
                is_registered: userEventIds.includes(event.id),
            }));
            return { statusCode: 200, message: 'Events fetched successfully', data: response };
        }
        catch (error) {
            throw new common_1.HttpException('Error fetching events', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getEventTypes() {
        try {
            const filePath = path.join(__dirname, '..', '..', 'src', 'helper.json');
            if (!fs.existsSync(filePath)) {
                throw new Error(`File not found at path: ${filePath}`);
            }
            const fileContents = fs.readFileSync(filePath, 'utf-8');
            const events = JSON.parse(fileContents).events;
            return {
                statusCode: 200,
                message: 'Event types retrieved successfully',
                data: events,
            };
        }
        catch (error) {
            throw new common_1.HttpException('Error reading helper.json file', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Post)('create_event'),
    (0, event_swagger_1.createEventSwagger)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Get)(':id?'),
    (0, event_swagger_1.getEventByIdSwagger)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEventById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, event_swagger_1.deleteEventByIdSwagger)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "deleteEventById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, event_swagger_1.updateEventSwagger)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "updateEventById", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, event_swagger_1.searchEventsSwagger)(),
    __param(0, (0, common_1.Query)('location')),
    __param(1, (0, common_1.Query)('name')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "searchEvents", null);
__decorate([
    (0, common_1.Get)('userEventList/:userId'),
    (0, event_swagger_1.getUserEventsSwagger)(),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getUserEvents", null);
__decorate([
    (0, common_1.Get)('types/genre'),
    (0, event_swagger_1.getEventTypeSwagger)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEventTypes", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)('events'),
    (0, swagger_1.ApiTags)('events'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(user_event_entity_1.UserEvent)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EventController);
//# sourceMappingURL=event.controller.js.map