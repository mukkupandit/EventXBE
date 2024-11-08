"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersSwagger = exports.getUserByIdSwagger = exports.updateUserSwagger = exports.loginUserSwagger = exports.createUserSwagger = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("./user.dto");
const createUserSwagger = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('user'), (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }), (0, swagger_1.ApiBody)({
        type: user_dto_1.SignupDto,
        description: 'User data to create a new user',
    }), (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input data' }));
};
exports.createUserSwagger = createUserSwagger;
const loginUserSwagger = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('user'), (0, swagger_1.ApiOperation)({ summary: 'User login' }), (0, swagger_1.ApiBody)({
        type: user_dto_1.LoginDto,
        description: 'User credentials for login',
    }), (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input data' }));
};
exports.loginUserSwagger = loginUserSwagger;
const updateUserSwagger = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('user'), (0, swagger_1.ApiOperation)({ summary: 'Update user information' }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiHeader)({
        name: 'jwt token',
        description: '',
        required: false,
    }), (0, swagger_1.ApiBody)({
        type: user_dto_1.UpdateUserDto,
        description: 'User data to update',
    }), (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input data' }));
};
exports.updateUserSwagger = updateUserSwagger;
const getUserByIdSwagger = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('user'), (0, swagger_1.ApiOperation)({ summary: 'Get user by ID' }), (0, swagger_1.ApiHeader)({
        name: 'jwt token',
        description: '',
        required: false,
    }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiResponse)({ status: 200, description: 'User found successfully' }), (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }), (0, swagger_1.ApiResponse)({ status: 500, description: 'Failed to fetch user' }));
};
exports.getUserByIdSwagger = getUserByIdSwagger;
const getAllUsersSwagger = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)('user'), (0, swagger_1.ApiOperation)({ summary: 'Get all users' }), (0, swagger_1.ApiHeader)({
        name: 'jwt token',
        description: '',
        required: false,
    }), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiResponse)({ status: 200, description: 'User list retrieved successfully' }), (0, swagger_1.ApiResponse)({ status: 500, description: 'Failed to fetch users' }));
};
exports.getAllUsersSwagger = getAllUsersSwagger;
//# sourceMappingURL=swagger.user.js.map