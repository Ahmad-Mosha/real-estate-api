import { Controller, Param, Post, UseGuards } from '@nestjs/common';
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
}
