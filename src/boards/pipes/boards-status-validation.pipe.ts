import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardsStatus } from '../boards-status-enum';

export class BoardsStatusValidationPipe implements PipeTransform {
  // 게시판의 상태 옵션
  readonly StatusOptions = [BoardsStatus.PRIVATE, BoardsStatus.PUBLIC];

  transform(value: any, metadata: ArgumentMetadata) {
    const isValid = this.isStatusValid(value.status);

    // isValid가 true면 pass
    if (isValid) {
      return value;
    } else {
      // false면 400 에러
      throw new BadRequestException('status는 PRIVATE, PUBLIC만 가능합니다');
    }
  }

  // status가 StatusOptions에 없으면 false 반환하는 함수
  private isStatusValid(status: BoardsStatus) {
    const isValid = this.StatusOptions.indexOf(status);
    return isValid !== -1;
  }
}
