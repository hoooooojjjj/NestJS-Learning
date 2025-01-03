import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './board.entity';
import { BoardRepository } from './board.repository';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserEntity } from 'src/auth/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // board module에 BoardEntity import
  imports: [
    TypeOrmModule.forFeature([BoardEntity]),
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
  controllers: [BoardsController],
  // BoardRepository provider 등록
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
