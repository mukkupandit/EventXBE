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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Joi = require("joi");
const event_entity_1 = require("../event/event.entity");
const bcrypt = require("bcryptjs");
const swagger_user_1 = require("./swagger.user");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
const auth_guard_1 = require("./auth.guard");
const mailSender_1 = require("../mailSender");
let UserController = class UserController {
    constructor(userRepository, eventRepository, jwtService, mailSender) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.jwtService = jwtService;
        this.mailSender = mailSender;
    }
    async signup(userData) {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required(),
            password: Joi.string().required(),
            role: Joi.string().required(),
            age: Joi.string().required(),
        });
        const { error, value } = schema.validate(userData);
        if (error) {
            return {
                statusCode: 400,
                message: error.details[0].message,
            };
        }
        const { name, email, phone, password, role, age } = value;
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            return {
                statusCode: 400,
                message: 'User with this email already exists',
            };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role: role.toLowerCase(),
            age: age
        });
        const savedUser = await this.userRepository.save(newUser);
        let sendMail = await this.mailSender.sendMail(email, 'Welcome to NashTech!', `Hi ${name},\n\nWelcome to NashTech! Your signup was successful.\n\nBest regards,\nThe NashTech Team`);
        console.log(sendMail, 'sendMail');
        return {
            statusCode: 200,
            message: 'User signup successful',
            data: savedUser,
        };
    }
    async login(credentials) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        const { error, value } = schema.validate(credentials);
        if (error) {
            return {
                statuscode: 400,
                message: error.details[0].message,
            };
        }
        const { email, password } = value;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return {
                statuscode: 422,
                message: 'User with this email does not exist.',
            };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                statuscode: 401,
                message: 'Invalid Password.',
            };
        }
        delete user.password;
        const payload = { sub: user.id, username: user.email };
        const access_token = await this.jwtService.signAsync(payload);
        return {
            statuscode: 200,
            message: 'Login successful',
            access_token: access_token,
            data: user,
        };
    }
    async getUserById(id) {
        try {
            const user = await this.userRepository.findOne({ where: { id: id } });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            delete user.password;
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'User found successfully.',
                data: user,
            };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllUsers() {
        try {
            const users = await this.userRepository.find();
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'User list retrieved successfully.',
                data: users,
            };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch users', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUserProfile(id, userData) {
        try {
            const schema = Joi.object({
                name: Joi.string().optional(),
                email: Joi.string().email().optional(),
                phone: Joi.string().optional(),
                age: Joi.number().integer().min(0).max(150).optional(),
                image: Joi.string().optional(),
            });
            const { error } = schema.validate(userData);
            if (error) {
                return {
                    statusCode: 400,
                    message: error.details[0].message,
                };
            }
            const user = await this.userRepository.findOne({ where: { id: id } });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            Object.assign(user, userData);
            const updatedUser = await this.userRepository.save(user);
            delete updatedUser.password;
            if (userData.email || userData.phone) {
                const eventsToUpdate = await this.eventRepository.find({ where: { user_id: id } });
                for (const event of eventsToUpdate) {
                    if (userData.email) {
                        event.email = userData.email;
                    }
                    if (userData.phone) {
                        event.phone = userData.phone;
                    }
                    await this.eventRepository.save(event);
                }
            }
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'User profile updated successfully',
                data: updatedUser,
            };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to update user profile', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.userRepository.findOne({ where: { id: id } });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            await this.userRepository.delete(id);
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'User deleted successfully',
            };
        }
        catch (error) {
            throw new common_1.HttpException('Failed to delete user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUserPassword(eventData) {
        try {
            const user = await this.userRepository.findOne({ where: { email: eventData.email } });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            const hashedPassword = await bcrypt.hash(eventData.password, 10);
            const event = await this.userRepository.update(user.id, { "password": hashedPassword, updated_at: new Date() });
            let updatedUser = await this.userRepository.findOne({
                where: { id: eventData.userId }
            });
            return { statusCode: 200, message: 'Password reset successfully', user: updatedUser };
        }
        catch (error) {
            throw new common_1.HttpException('Error resetting password', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_user_1.createUserSwagger)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_user_1.loginUserSwagger)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_user_1.getUserByIdSwagger)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_user_1.getAllUsersSwagger)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_user_1.updateUserSwagger)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserProfile", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Put)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserPassword", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('user'),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        mailSender_1.MailSender])
], UserController);
//# sourceMappingURL=user.controller.js.map