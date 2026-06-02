import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards, Patch
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

import { CartService } from './cart.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Tambah produk ke cart' })
  addToCart(
    @GetUser('id') userId: number,
    @Body() dto: AddToCartDto,
  ) {
    return this.cartService.add(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Ambil isi cart user' })
  getCart(@GetUser('id') userId: number) {
    return this.cartService.getCart(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus item cart' })
  removeItem(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number,
  ) {
    return this.cartService.remove(userId, id);
  }

@Patch(':id')
updateCart(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: UpdateCartDto,
) {
  return this.cartService.updateQty(id, dto.quantity);
}
}