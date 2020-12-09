//ANALIZAR BOARD -> PieceFactory
export function analizeBoard(board) {
  let boardArr = [];
  let index = 0;

  while (index * 16 < 256) {
    boardArr.push(board.substring(index * 16, index * 16 + 16).split(""));
    index++;
  }
  return boardArr;
}
