export function analizeBoard(board) {
  let boardArr = [];
  let index = 0;

  while (index * 16 < 256) {
    boardArr.push(board.substring(index * 16, index * 16 + 16).split(""));
    index++;
  }
  return boardArr;
}

const isPawnFirstMove = (i) => {
  let resp = (i === 12) | (i === 13) ? true : false;
  return resp;
};

const selectPiece = (board) => {
  let pieceToPlay = {
    srcCol: "",
    srcRow: "",
    id: "",
  };

  for (i; i <= 15; i++) {
    if (board[i].includes(getFormatedPiece(Piece.PAWN, actual_turn))) {
      for (ii; ii < 15; ii++) {
        if (board[i][ii] === getFormatedPiece(Piece.PAWN, actual_turn)) {
          pieceToPlay.srcCol = board[i].indexOf(board[i][ii]);
          pieceToPlay.srcRow = i;
          pieceToPlay.id = getFormatedPiece(Piece.PAWN, actual_turn);
          return;
          // move.fromC = col_pos;
          // move.fromR = row_pos;

          // if (isPawnFirstMove(i)) {
          //   move.toC = col_pos;
          //   move.toR = row_pos - 2;
          //   ii = 16;
          //   i = 16;
          // } else {
          //   move.toC = col_pos;
          //   move.toR = row_pos - 1;
          //   ii = 16;
          //   i = 16;
          // }
        }
      }
    }
    return pieceToPlay;
  }
};
