import { IsNotEmpty } from 'class-validator';
export class CreateBoardDto {
  // IsNotEmpty로 비어있는 값 예외처리
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
