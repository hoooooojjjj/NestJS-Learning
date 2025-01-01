import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './repository/user.repository';
import { UserEntity } from './entity/user.entity';

// 요청으로 들어온 엑세스 토큰이 유효한지 확인하는 Provider
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    // PassportStrategy의 secretOrKey, jwtFromRequest를 설정
    super({
      // 엑세스 토큰을 만들 때 사용한 Secret Text
      secretOrKey: 'Secret1234',
      // 엑세스 토큰이 어디에서 들어오는지 설정
      // fromAuthHeaderAsBearerToken -> Authorization header에 Bearer token 타입으로 들어온다고 설정
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // 엑세스 토큰이 유효한지(해당 유저가 존재하는지) 검증하는 메서드
  async validate(payload): Promise<UserEntity> {
    const { username } = payload;

    // payload 안에 있는 username이 실제 존재하는 username인지 확인
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('엑세스 토큰이 유효하지 않습니다');
    }

    // 유저 정보를 반환 -> 클라이언트 요청 값에 포함되어 반환됨
    return user;
  }
}
