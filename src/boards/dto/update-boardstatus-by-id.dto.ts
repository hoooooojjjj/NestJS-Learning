import { BoardsStatus } from '../boards-status-enum';
import { BoardsStatusValidationPipe } from '../pipes/boards-status-validation.pipe';

export class UpdateBoardsStatusByIdDto {
  id: string;

  status: BoardsStatus;
}
