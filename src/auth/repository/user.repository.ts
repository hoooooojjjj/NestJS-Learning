import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { AuthCredentialDto } from '../dto/authCredentailDto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
    const { username, password } = authCredentialDto;

    // 새로운 유저 생성
    const newUser = await this.create({
      username,
      password,
    });

    // 유저 생성 저장
    await this.save(newUser);

    return newUser;
  }
}
