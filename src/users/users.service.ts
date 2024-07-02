// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AuthPayload } from 'src/auth/dto/auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(payload: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = payload.username;
    user.roles = payload.roles;
    user.password = await bcrypt.hash(payload.password, 10);
    return this.userRepository.save(user);
  }

  async validateUserPassword(authPayload: AuthPayload): Promise<string> {
    const { username, password } = authPayload;
    const user = await this.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user.username;
    }
    return null;
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, payload: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.username = payload.username;
    user.password = await bcrypt.hash(payload.password, 10);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.delete(id);
    if (!user.affected) {
      throw new NotFoundException('User not found');
    }
    return;
  }
}
