"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const event_controller_1 = require("./event/event.controller");
const event_entity_1 = require("./event/event.entity");
const user_controller_1 = require("./user/user.controller");
const user_entity_1 = require("./user/user.entity");
const admin_module_1 = require("./admin/admin.module");
const user_event_module_1 = require("./user-event/user-event.module");
const user_event_entity_1 = require("./user-event/user-event.entity");
const jwt_1 = require("@nestjs/jwt");
const mailSender_1 = require("./mailSender");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: '.dev.env', isGlobal: true, }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'dpg-csm79h3tq21c738dcek0-a.oregon-postgres.render.com',
                port: 5432,
                username: 'emsdb_8i5o_user',
                password: 'bEei1BfwUAmLXMpTmxqDzq0SilLXzaRK',
                database: 'emsdb_8i5o',
                entities: [event_entity_1.Event, user_entity_1.User, user_event_entity_1.UserEvent],
                synchronize: true,
                ssl: {
                    rejectUnauthorized: false,
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([event_entity_1.Event, user_entity_1.User, user_event_entity_1.UserEvent]),
            admin_module_1.AdminModule,
            user_event_module_1.UserEventModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: 'qwertyuiopasdfghjklzxcvbnm123456',
                signOptions: { expiresIn: '600s' },
            }),
        ],
        controllers: [app_controller_1.AppController, event_controller_1.EventController, user_controller_1.UserController],
        providers: [app_service_1.AppService, mailSender_1.MailSender],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map