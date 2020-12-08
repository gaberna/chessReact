//SELECCIONAR MOV-PIEZA
export default function blackPiece(board) {
  let col_pos = "";
  let row_pos = "";
  let i = 15;
  let ii = 0;

  const move = {
    fromC: "",
    fromR: "",
    toC: "",
    toR: "",
  };

  for (i; i >= 0; --i) {
    if (board[i].includes("p")) {
      for (ii; ii < 15; ii++) {
        if (board[i][ii] === "p") {
          col_pos = board[i].indexOf(board[i][ii]);
          row_pos = board.indexOf(board[i]);

          if ((i === 2) | (i === 3)) {
            move.fromC = col_pos;
            move.fromR = row_pos;
            move.toC = col_pos;
            move.toR = row_pos + 2;
            ii = 16;
            i = -1;
          } else {
            move.fromC = col_pos;
            move.fromR = row_pos;
            move.toC = col_pos;
            move.toR = row_pos + 1;
            ii = 16;
            i = -1;
          }
        }
      }
    }
  }
  return move;
}
