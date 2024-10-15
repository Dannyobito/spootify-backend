import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '../entities/user.entity';

enum AllowedRoles {
  LISTENER = UserRole.LISTENER,
  ARTIST = UserRole.ARTIST,
}

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(AllowedRoles)
  role: AllowedRoles;
}
