import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePaymentStatusDto } from './dto/update-payment.dto';

import {
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order.dto';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';

import { Role, OrderStatus } from '@prisma/client';
import { multerConfig } from '../common/upload.config';


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
  return this.ordersService.updateStatus(
    id,
    body.status as OrderStatus,
  );
}

  // user cancel order
  @Patch(':id/cancel')
  cancel(@Param('id', ParseIntPipe) id: number, @GetUser('id') userId: number) {
    return this.ordersService.cancel(id, userId);
  }

@Patch(':id/payment-status')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
updatePaymentStatus(
  @Param('id', ParseIntPipe) id: number,
  @Body() body: UpdatePaymentStatusDto,
) {
  return this.ordersService.updatePaymentStatus(id, body.paymentStatus);
}

@Patch(':id/upload-proof')
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      paymentProof: {
        type: 'string',
        format: 'binary',
      },
    },
  },
})
@UseInterceptors(FileInterceptor('paymentProof', multerConfig))
uploadProof(
  @Param('id', ParseIntPipe) id: number,
  @GetUser('id') userId: number,
  @UploadedFile() file: Express.Multer.File,
) {
  return this.ordersService.uploadProof(id, userId, file);
}

@UseGuards(JwtGuard)
@Post('checkout')
checkout(@GetUser('id') userId: number) {
  return this.ordersService.checkout(userId);
}

}