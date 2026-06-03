import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role, ProductCategory } from '@prisma/client';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../common/upload.config';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

@ApiBearerAuth() // ← tambah ini

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // admin buat produk
@Post()
@UseGuards(JwtGuard, RolesGuard)
@Roles(Role.ADMIN)
@UseInterceptors(FileInterceptor('image', multerConfig))
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      price: { type: 'number' },
      stock: { type: 'number' },
      category: {
        type: 'string',
        enum: ['MAKANAN', 'SUPLEMEN', 'AKSESORIS'],
      },
      description: { type: 'string' },
      image: {
        type: 'string',
        format: 'binary',
      },
    },
  },
})
create(
  @Body() dto: CreateProductDto,
  @UploadedFile() file: Express.Multer.File,
) {
  return this.productsService.create(dto, file);
}

  // semua orang bisa lihat produk (tidak perlu login)
  @Get()
  findAll(@Query('category') category?: ProductCategory) {
    return this.productsService.findAll(category);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
@UseGuards(JwtGuard, RolesGuard)
@Roles(Role.ADMIN)

@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      price: { type: 'number' },
      stock: { type: 'number' },
      category: {
        type: 'string',
        enum: ['MAKANAN', 'SUPLEMEN','AKSESORIS'],
      },
      description: { type: 'string' },
      image: {
        type: 'string',
        format: 'binary',
      },
    },
  },
})

@UseInterceptors(FileInterceptor('image', multerConfig))
update(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: UpdateProductDto,
  @UploadedFile() file?: Express.Multer.File,
) {
  return this.productsService.update(id, dto, file);
}

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }


}
