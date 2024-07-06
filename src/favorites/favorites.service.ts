import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(user: User): Promise<Favorite[]> {
    return this.favoriteRepository.find({
      where: { user: { id: user.id } },
      relations: ['propertyId'],
    });
  }
  async findOne(id: string, user: User): Promise<Favorite> {
    return this.favoriteRepository.findOne({
      where: { id, user: { id: user.id } },
    });
  }

  async delete(id: string, user: User) {
    const favoriteToDelete = await this.favoriteRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!favoriteToDelete) {
      throw new NotFoundException('Favorite not found');
    }

    return this.favoriteRepository.remove(favoriteToDelete);
  }
}
