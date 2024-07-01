import { UsersService } from 'src/users/users.service';
// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entity/user.entity';
import { AuthPayload } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(
    authCredentialsDto: AuthPayload,
  ): Promise<{ accessToken: string }> {
    const username =
      await this.usersService.validateUserPassword(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Retrieve the user from the database based on the username
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, sub: user.id };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async signUp(payload: CreateUserDto): Promise<User> {
    return this.usersService.create(payload);
  }
}
