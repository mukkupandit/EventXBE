"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventsByTypeSwagger = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const getEventsByTypeSwagger = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('admin'), (0, swagger_1.ApiOperation)({ summary: 'Get events by type' }), (0, swagger_1.ApiHeader)({
        name: 'token',
        description: 'JWT token for authentication',
        required: false,
    }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiQuery)({ name: 'type', enum: ['past', 'current', 'trending', 'upcoming'], description: 'Type of events to fetch' }), (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input data' }));
};
exports.getEventsByTypeSwagger = getEventsByTypeSwagger;
//# sourceMappingURL=admin.swagger.js.map