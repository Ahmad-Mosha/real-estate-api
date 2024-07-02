import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserGuard } from 'src/auth/guards/ownership.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
