import { Favorite } from 'src/favorites/entity/favorite.entity';
import { User } from 'src/users/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  location: string;

  @ManyToOne(() => User, (user) => user.properties)
  user: User;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @Column()
  no_of_baths: number;

  @Column()
  no_of_beds: number;
}
