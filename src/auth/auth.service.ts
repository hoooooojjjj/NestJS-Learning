import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { AuthCredentialDto } from './dto/authCredentailDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    // Jwt를 사용하기 위해 JwtService 주입
    private jwtService: JwtService,
  ) {}

  // 유저 생성(회원가입)
  createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  // 로그인
  async signin(authCredentialDto: AuthCredentialDto): Promise<{
    accessToken: string;
  }> {
    // 우리 서비스의 유저가 맞는지 확인하는 로직(데이터 처리 로직이기 때문에 repo에서 처리)
    const isMyUser = await this.userRepository.signin(authCredentialDto);

    // 유저가 없으면 엑세스 토큰 생성 X
    if (!isMyUser) {
      return;
    }

    const { username } = authCredentialDto;

    // payload에 해당 유저의 정보를 기록 (etc. 이름, 권한, 이메일 등)
    // -> payload에는 중요한 정보 저장하면 안됨 !
    const payload = { username };

    // 해당 payload를 담아서 accessToken 생성
    const accessToken = await this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }
}
