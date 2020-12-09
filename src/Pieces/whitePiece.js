import { Piece, getFormatedPiece } from "../pieces.js";

const isPawnFirstMove = (i) => {
  let resp = (i === 12) | (i === 13) ? true : false;
  return resp;
};

export default function whitePiece(board, actual_turn) {
  let col_pos = "";
  let row_pos = "";
  let i = 0;
  let ii = 0;

  const move = {
    fromC: "",
    fromR: "",
    toC: "",
    toR: "",
  };

  for (i; i <= 15; i++) {
    if (board[i].includes(getFormatedPiece(Piece.PAWN, actual_turn))) {
      for (ii; ii < 15; ii++) {
        if (board[i][ii] === getFormatedPiece(Piece.PAWN, actual_turn)) {
          col_pos = board[i].indexOf(board[i][ii]);
          row_pos = i;
          move.fromC = col_pos;
          move.fromR = row_pos;

          if (isPawnFirstMove(i)) {
            move.toC = col_pos;
            move.toR = row_pos - 2;
            ii = 16;
            i = 16;
          } else {
            move.toC = col_pos;
            move.toR = row_pos - 1;
            ii = 16;
            i = 16;
          }
        }
      }
    } else if (board[i].includes(getFormatedPiece(Piece.QUEEN, actual_turn))) {
      for (ii; ii < 16; ii++) {
        if (board[i][ii] === getFormatedPiece(Piece.QUEEN, actual_turn)) {
          col_pos = board[i].indexOf(board[i][ii]);
          row_pos = board.indexOf(board[i]);

          if (col_pos === 15 && row_pos === 0) {
            move.fromC = col_pos;
            move.fromR = row_pos;
            move.toC = col_pos;
            move.toR = row_pos + 1;
            ii = 17;
            i = 17;
          } else if (row_pos === 1 && col_pos !== 0) {
            move.fromC = col_pos;
            move.fromR = row_pos;
            move.toC = col_pos - 1;
            move.toR = row_pos;
            ii = 17;
            i = 17;
          } else if (row_pos === 0) {
            move.fromC = col_pos;
            move.fromR = row_pos;
            move.toC = col_pos + 1;
            move.toR = row_pos;
            ii = 17;
            i = -1;
          } else {
            move.fromC = col_pos;
            move.fromR = row_pos;
            move.toC = col_pos;
            move.toR = row_pos - 1;
            ii = 16;
            i = -1;
          }
        }
      }
    }
  }
  return move;
}
