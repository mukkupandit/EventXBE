"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventTypeSwagger = exports.searchEventsSwagger = exports.getUserEventsSwagger = exports.deleteEventByIdSwagger = exports.getEventByIdSwagger = exports.updateEventSwagger = exports.createEventSwagger = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const events_dto_1 = require("./events.dto");
const createEventSwagger = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('events'), (0, swagger_1.ApiHeader)({
        name: 'jwt token',
        description: '',
        required: false,
    }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Create a new event' }), (0, swagger_1.ApiBody)({ type: events_dto_1.CreateEventDto, description: 'Event data to create a new event' }), (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input data' }));
};
exports.createEventSwagger = createEventSwagger;
const updateEventSwagger = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('events'), (0, swagger_1.ApiHeader)({
        name: 'jwt token',
        description: '',
        required: false,
    }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Update an existing event' }), (0, swagger_1.ApiBody)({ type: events_dto_1.UpdateEventDto, description: 'Event data to update an existing event' }), (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input data' }));
};
exports.updateEventSwagger = updateEventSwagger;
const getEventByIdSwagger = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('events'), (0, swagger_1.ApiHeader)({
        name: 'jwt token',
        description: '',
        required: false,
    }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Get event by ID' }), (0, swagger_1.ApiParam)({ name: 'id', required: false, description: 'ID of the event' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Event found successfully' }), (0, swagger_1.ApiResponse)({ status: 422, description: 'No data found' }));
};
exports.getEventByIdSwagger = getEventByIdSwagger;
const deleteEventByIdSwagger = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('events'), (0, swagger_1.ApiHeader)({
        name: 'jwt token',
        description: '',
        required: false,
    }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Delete event by ID' }), (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'ID of the event to be deleted' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Event deleted successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'Event not found' }), (0, swagger_1.ApiResponse)({ status: 500, description: 'Error deleting event' }));
};
exports.deleteEventByIdSwagger = deleteEventByIdSwagger;
const getUserEventsSwagger = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('events'), (0, swagger_1.ApiHeader)({
        name: 'authorization',
        description: '',
        required: false,
    }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Get events for a user by user ID' }), (0, swagger_1.ApiParam)({ name: 'userId', required: true, description: 'ID of the user to fetch events for' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Events fetched successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request: User ID is required' }), (0, swagger_1.ApiResponse)({ status: 500, description: 'Error fetching events' }));
};
exports.getUserEventsSwagger = getUserEventsSwagger;
const searchEventsSwagger = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('events'), (0, swagger_1.ApiHeader)({
        name: 'jwt token',
        description: '',
        required: false,
    }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Search events' }), (0, swagger_1.ApiQuery)({ name: 'location', required: false, description: 'Location of the event' }), (0, swagger_1.ApiQuery)({ name: 'name', required: false, description: 'Name of the event' }), (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, description: 'Start date of the event' }), (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, description: 'End date of the event' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Events found successfully' }), (0, swagger_1.ApiResponse)({ status: 422, description: 'No data found' }));
};
exports.searchEventsSwagger = searchEventsSwagger;
const getEventTypeSwagger = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('events'), (0, swagger_1.ApiHeader)({
        name: 'authorization',
        description: '',
        required: false,
    }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Get events type list' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Events type fetched successfully' }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request: Somthing went wrong.' }), (0, swagger_1.ApiResponse)({ status: 500, description: 'Error fetching events type' }));
};
exports.getEventTypeSwagger = getEventTypeSwagger;
//# sourceMappingURL=event.swagger.js.map