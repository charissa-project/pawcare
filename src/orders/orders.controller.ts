import {
  Controller, Get, Post, Patch,
  Body, Param, ParseIntPipe, UseGuards, 
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Role } from '@prisma/client';
import { ApiBearerAuth } from '@nestjs/swagger'; // ← tambah import
import { UpdateOrderStatusDto } from './dto/update-order.dto'; // ← tambah import

@ApiBearerAuth() // ← tambah ini

@UseGuards(JwtGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@GetUser('id') userId: number, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(userId, dto);
  }

  // user lihat order miliknya
  @Get('my')
  findMine(@GetUser('id') userId: number) {
    return this.ordersService.findAllByUser(userId);
  }

  // admin lihat semua order
  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
    @GetUser('role') role: Role,
  ) {
    return this.ordersService.findOne(id, userId, role);
  }

  // admin update status
@Patch(':id/status')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
updateStatus(
  @Param('id', ParseIntPipe) id: number,
  @Body() body: UpdateOrderStatusDto,
) {
  return this.ordersService.updateStatus(id, body.status);
}

  // user cancel order
  @Patch(':id/cancel')
  cancel(@Param('id', ParseIntPipe) id: number, @GetUser('id') userId: number) {
    return this.ordersService.cancel(id, userId);
  }

@Patch(':id/verify-payment')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
verifyPayment(
  @Param('id', ParseIntPipe) id: number,
) {
  return this.ordersService.verifyPayment(id);
}

}