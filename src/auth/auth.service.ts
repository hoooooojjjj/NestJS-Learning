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

  createUser(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
    return this.userRepository.createUser(authCredentialDto);
  }
}
