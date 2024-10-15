import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const { password, role, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      ...rest,
      role: role as unknown as UserRole,
      password: hashedPassword,
    });
    await this.usersRepository.save(newUser);
    return this.createToken(newUser);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      return this.createToken(user);
    }
    throw new UnauthorizedException('Invalid Username or password');
  }

  private createToken(user: User) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
