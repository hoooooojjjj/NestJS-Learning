import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { AuthCredentialDto } from './dto/authCredentailDto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  // 유저 생성(회원가입)
  createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  // 로그인
  signin(authCredentialDto: AuthCredentialDto): Promise<string> {
    return this.userRepository.signin(authCredentialDto);
  }
}
