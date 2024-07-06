import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entity/favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
