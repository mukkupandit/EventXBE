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
exports.UserEventController = void 0;
const common_1 = require("@nestjs/common");
const Joi = require("joi");
const user_event_service_1 = require("./user-event.service");
const user_event_swagger_1 = require("./user-event.swagger");
const auth_guard_1 = require("../user/auth.guard");
let UserEventController = class UserEventController {
    constructor(userEventService) {
        this.userEventService = userEventService;
    }
    async registerUserToEvent(body) {
        const schema = Joi.object({
            user_id: Joi.number().required(),
            event_id: Joi.number().required(),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            return {
                statusCode: 400,
                message: error.details[0].message,
            };
        }
        return await this.userEventService.registerUserToEvent(value.user_id, value.event_id);
    }
    async getUserEvents(userId) {
        const schema = Joi.object({
            user_id: Joi.number().required(),
        });
        const { error, value } = schema.validate({ user_id: userId });
        if (error) {
            return {
                statusCode: 400,
                message: error.details[0].message,
            };
        }
        return await this.userEventService.getUserEvents(value.user_id);
    }
    async getEventUsers(eventId) {
        const schema = Joi.object({
            event_id: Joi.number().required(),
        });
        const { error, value } = schema.validate({ event_id: eventId });
        if (error) {
            return {
                statusCode: 400,
                message: error.details[0].message,
            };
        }
        return await this.userEventService.getEventUsers(value.event_id);
    }
};
exports.UserEventController = UserEventController;
__decorate([
    (0, user_event_swagger_1.registerUserToEventSwagger)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserEventController.prototype, "registerUserToEvent", null);
__decorate([
    (0, user_event_swagger_1.getUserEventsSwagger)(),
    (0, common_1.Get)('user/:user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserEventController.prototype, "getUserEvents", null);
__decorate([
    (0, user_event_swagger_1.getEventUsersSwagger)(),
    (0, common_1.Get)('event/:event_id'),
    __param(0, (0, common_1.Param)('event_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserEventController.prototype, "getEventUsers", null);
exports.UserEventController = UserEventController = __decorate([
    (0, common_1.Controller)('user-event'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [user_event_service_1.UserEventService])
], UserEventController);
//# sourceMappingURL=user-event.controller.js.map