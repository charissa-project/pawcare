import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger'; // ← tambah import

@ApiBearerAuth() // ← tambah ini

@UseGuards(JwtGuard)
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  create(@GetUser('id') userId: number, @Body() dto: CreateReminderDto) {
    return this.remindersService.create(userId, dto);
  }

  // semua reminder milik user
  @Get()
  findAll(@GetUser('id') userId: number) {
    return this.remindersService.findAllByUser(userId);
  }

  // reminder by pet
  @Get('pet/:petId')
  findByPet(
    @Param('petId', ParseIntPipe) petId: number,
    @GetUser('id') userId: number,
  ) {
    return this.remindersService.findByPet(petId, userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
    @Body() dto: UpdateReminderDto,
  ) {
    return this.remindersService.update(id, userId, dto);
  }

  // mark as done
  @Patch(':id/done')
  markDone(@Param('id', ParseIntPipe) id: number, @GetUser('id') userId: number) {
    return this.remindersService.markDone(id, userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser('id') userId: number) {
    return this.remindersService.remove(id, userId);
  }
}
