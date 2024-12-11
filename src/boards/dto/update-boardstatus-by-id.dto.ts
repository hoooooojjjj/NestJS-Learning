import { BoardsStatus } from '../boards.model';

export class UpdateBoardsStatusByIdDto {
  id: string;
  status: BoardsStatus;
}
