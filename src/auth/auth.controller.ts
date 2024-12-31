import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/authCredentailDto';
import { UserEntity } from './entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  createUser(
    @Body() authCredentialDto: AuthCredentialDto,
  ): Promise<UserEntity> {
    return this.authService.createUser(authCredentialDto);
  }
}