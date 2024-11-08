import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventController } from './event/event.controller';
import { Event } from './event/event.entity';
import { UserController } from './user/user.controller';
import { User } from './user/user.entity';
import { AdminModule } from './admin/admin.module';
import { UserEventModule } from './user-event/user-event.module';
import { UserEvent } from './user-event/user-event.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailSender } from './mailSender';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.dev.env', isGlobal: true,}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-csm79h3tq21c738dcek0-a.oregon-postgres.render.com',
      port: 5432,
      username: 'emsdb_8i5o_user',
      password: 'bEei1BfwUAmLXMpTmxqDzq0SilLXzaRK',
      database: 'emsdb_8i5o',
      entities: [Event, User, UserEvent],
      synchronize: true,
      // ssl: true,
      ssl: {
        rejectUnauthorized: false,  // This allows connections without certificate validation
      },
    }),
    TypeOrmModule.forFeature([Event, User, UserEvent]),
    AdminModule,
    UserEventModule,
    JwtModule.register({
      global: true,
      secret: 'qwertyuiopasdfghjklzxcvbnm123456',
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [AppController, EventController, UserController],
  providers: [AppService, MailSender],
})
export class AppModule {}
