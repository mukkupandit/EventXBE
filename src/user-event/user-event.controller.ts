import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import * as Joi from 'joi';
import { UserEventService } from './user-event.service';
import { registerUserToEventSwagger, getUserEventsSwagger, getEventUsersSwagger } from './user-event.swagger';
import { AuthGuard } from '../user/auth.guard';

@Controller('user-event')
@UseGuards(AuthGuard)
export class UserEventController {
  constructor(private readonly userEventService: UserEventService) {}

  @registerUserToEventSwagger()
  @Post('register')
  async registerUserToEvent(@Body() body: { user_id: number; event_id: number }) {
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

  @getUserEventsSwagger()
  @Get('user/:user_id')
  async getUserEvents(@Param('user_id') userId: string) {
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

  @getEventUsersSwagger()
  @Get('event/:event_id')
  async getEventUsers(@Param('event_id') eventId: string) {
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
}
