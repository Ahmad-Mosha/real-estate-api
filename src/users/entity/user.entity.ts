// user.entity.ts
import { Role } from 'src/common/enums/roles.enum';
import { Favorite } from 'src/favorites/entity/favorite.entity';
import { Property } from 'src/properties/entity/propety.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Property, (property) => property.user)
  properties: Property[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  roles: Role;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
