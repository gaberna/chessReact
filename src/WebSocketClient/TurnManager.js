import getPieceMovement from "../Pieces/PieceMovement";
import { analizeBoard, selectPiece } from "../Pieces/PieceSelectionManager";

let moveToSend = {
  action: "",
  data: {
    board_id: "",
    turn_token: "",
    from_row: "",
    from_col: "",
    to_row: "",
    to_col: "",
  },
};

// Fills an object to send next move.
export function makeMove(actual_turn, board_id, turn_token, board) {
  let interpretedBoard = analizeBoard(board);
  let selectedPiece = selectPiece(interpretedBoard, actual_turn);
  const move = getPieceMovement(selectedPiece, actual_turn);
  debugger;
  moveToSend = {
    action: "move",
    data: {
      board_id: board_id,
      turn_token: turn_token,
      from_row: move.fromR,
      from_col: move.fromC,
      to_row: move.toR,
      to_col: move.toC,
    },
  };
  return moveToSend;
}
