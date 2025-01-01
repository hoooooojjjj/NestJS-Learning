import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/authCredentailDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  createUser(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.createUser(authCredentialDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signin(@Body() authCredentialDto: AuthCredentialDto): Promise<{
    accessToken: string;
  }> {
    return this.authService.signin(authCredentialDto);
  }

  @Post('test')
  // UseGuards 미들웨어를 사용하면 요청이 들어올 때 controller에 닿기 전에
  // JwtStrategy에서 작성한 validate() 메서드로 인증 로직을 미리 처리할 수 있음.
  // 이때 PassportStrategy를 사용했기 때문에 AuthGuard()를 인자로 넣어주면
  // 자동으로 JwtStrategy에서 작성한 validate() 메서드로 인증 로직이 처리됨
  @UseGuards(AuthGuard())
  authTest(@Request() req) {
    console.log(req.user);
  }
}
