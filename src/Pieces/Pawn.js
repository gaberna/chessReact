const Pawn = () => {
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
};
