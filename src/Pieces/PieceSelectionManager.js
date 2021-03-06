import { getFormatedPiece, Piece } from "../pieces";

// Analize game board and returns a navegable array.
export function analizeBoard(board) {
  let boardArr = [];
  let index = 0;

  while (index * 16 < 256) {
    boardArr.push(board.substring(index * 16, index * 16 + 16).split(""));
    index++;
  }
  return boardArr;
}

// Checks pawn position
export const isPawnFirstMove = (row, actual_turn) => {
  return (
    (actual_turn === "white" && row === 12) ||
    row === 13 ||
    (actual_turn === "black" && row === 2) ||
    row === 3
  );
};

// Selects the pawn or queen nearest to enemy side.
export const selectPiece = (board, actual_turn) => {
  let pieceToPlay = {
    srcCol: "",
    srcRow: "",
    id: "",
  };
  if (actual_turn === "white") {
    for (let i = 0; i <= 15; i++) {
      if (board[i].includes(getFormatedPiece(Piece.PAWN, actual_turn))) {
        for (let ii = 0; ii < 15; ii++) {
          if (board[i][ii] === getFormatedPiece(Piece.PAWN, actual_turn)) {
            pieceToPlay.srcCol = ii;
            pieceToPlay.srcRow = i;
            pieceToPlay.id = getFormatedPiece(Piece.PAWN, actual_turn);
            return pieceToPlay;
          }
        }
      } else if (
        board[i].includes(getFormatedPiece(Piece.QUEEN, actual_turn))
      ) {
        for (let ii = 0; ii < 15; ii++) {
          if (board[i][ii] === getFormatedPiece(Piece.QUEEN, actual_turn)) {
            pieceToPlay.srcCol = ii;
            pieceToPlay.srcRow = i;
            pieceToPlay.id = getFormatedPiece(Piece.QUEEN, actual_turn);
            return pieceToPlay;
          }
        }
      }
    }
  } else {
    for (let i = 15; i >= 0; i--) {
      if (board[i].includes(getFormatedPiece(Piece.PAWN, actual_turn))) {
        for (let ii = 0; ii < 15; ii++) {
          if (board[i][ii] === getFormatedPiece(Piece.PAWN, actual_turn)) {
            pieceToPlay.srcCol = ii;
            pieceToPlay.srcRow = i;
            pieceToPlay.id = getFormatedPiece(Piece.PAWN, actual_turn);
            return pieceToPlay;
          }
        }
      } else if (
        board[i].includes(getFormatedPiece(Piece.QUEEN, actual_turn))
      ) {
        for (let ii = 0; ii < 15; ii++) {
          if (board[i][ii] === getFormatedPiece(Piece.QUEEN, actual_turn)) {
            pieceToPlay.srcCol = ii;
            pieceToPlay.srcRow = i;
            pieceToPlay.id = getFormatedPiece(Piece.QUEEN, actual_turn);
            return pieceToPlay;
          }
        }
      }
    }
  }
};
