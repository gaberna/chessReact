import blackPiece from "../Pieces/blackPiece";
import whitePiece from "../Pieces/whitePiece";
import { analizeBoard } from "../Pieces/PieceFactory";

//REALIZAR MOVIMIENTO
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

export function makeMove(actual_turn, board_id, turn_token, board) {
  let interpretedBoard = analizeBoard(board);
  if (actual_turn === "black") {
    const move = blackPiece(interpretedBoard);

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
  } else {
    const move = whitePiece(interpretedBoard, actual_turn);

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
  }
  return moveToSend;
}
