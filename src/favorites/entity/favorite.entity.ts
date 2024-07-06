// src/favorites/entity/favorite.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entity/user.entity';
import { Property } from 'src/properties/entity/propety.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Property, (property) => property.favorites)
  propertyId: string;
  @ManyToOne(() => User, (user) => user.favorites)
  user: User;
}
