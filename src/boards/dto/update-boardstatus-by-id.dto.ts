import { BoardsStatus } from '../boards.model';
import { BoardsStatusValidationPipe } from '../pipes/boards-status-validation.pipe';

export class UpdateBoardsStatusByIdDto {
  id: string;

  status: BoardsStatus;
}
