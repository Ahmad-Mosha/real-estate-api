import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Post('create/:propertyId')
  @UseGuards(JwtAuthGuard)
  async create(@Param('propertyId') propertyId: string, @GetUser() user: any) {
    return this.favoriteService.create(propertyId, user);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async findAll(@GetUser() user: any) {
    return this.favoriteService.findAll(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @GetUser() user: any) {
    return this.favoriteService.findOne(id, user);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @GetUser() user: any) {
    return this.favoriteService.delete(id, user);
  }
}
