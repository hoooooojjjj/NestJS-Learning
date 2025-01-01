import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    // Jwt를 사용하기 위해서 Auth 모듈에 Jwt 모듈 등록
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: {
        expiresIn: 360 * 60,
      },
    }),
    // Passport를 사용하기 위해서 Auth 모듈에 Passport 모듈 등록
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [AuthController],
  // 토큰 검증을 위해서 만든 JwtStrategy를 Auth 모듈의 providers로 주입
  providers: [AuthService, UserRepository, JwtStrategy],
  // 다른 모듈에서도 사용할 수 있게 export
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
