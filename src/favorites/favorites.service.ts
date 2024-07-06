import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entity/favorite.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async create(propertyId: string, user: User): Promise<Favorite> {
    const favorite = new Favorite();
    favorite.user = user;
    favorite.propertyId = propertyId;
    await this.favoriteRepository.save(favorite);
    return favorite;
  }
}
