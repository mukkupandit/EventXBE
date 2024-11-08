"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventUsersSwagger = exports.getUserEventsSwagger = exports.registerUserToEventSwagger = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_event_dto_1 = require("./user-event.dto");
const registerUserToEventSwagger = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiHeader)({
        name: 'jwt token',
        description: '',
        required: false,
    }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiTags)('user-event'), (0, swagger_1.ApiOperation)({ summary: 'Register a user to an event' }), (0, swagger_1.ApiBody)({ type: user_event_dto_1.RegisterUserEventDto, description: 'Data to register a user to an event' }), (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input data' }), (0, swagger_1.ApiResponse)({ status: 422, description: 'User or Event not found' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'User registered to event successfully' }));
};
exports.registerUserToEventSwagger = registerUserToEventSwagger;
const getUserEventsSwagger = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiHeader)({
        name: 'jwt token',
        description: '',
        required: false,
    }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiTags)('user-event'), (0, swagger_1.ApiOperation)({ summary: 'Get events for a user' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Events retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 422, description: 'No events found for user' }));
};
exports.getUserEventsSwagger = getUserEventsSwagger;
const getEventUsersSwagger = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiHeader)({
        name: 'jwt token',
        description: '',
        required: false,
    }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiTags)('user-event'), (0, swagger_1.ApiOperation)({ summary: 'Get users for an event' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Users retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 422, description: 'No users found for event' }));
};
exports.getEventUsersSwagger = getEventUsersSwagger;
//# sourceMappingURL=user-event.swagger.js.map