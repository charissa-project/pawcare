import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {

  constructor(
    private usersService:UsersService
  ){}

  @Get()

  @UseGuards(
    JwtGuard,
    RolesGuard
  )

  @Roles('ADMIN')

  findAll(){

    return this.usersService.findAll()

  }

}