import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/, {
    message: '비밀번호는 영문 숫자 조합 8자리 이상이어야 합니다',
  })
  password: string;
}
