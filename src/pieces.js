export const Piece = {
  PAWN: "p",
  QUEEN: "q",
  HORSE: "h",
  ROCK: "r",
  BISHOP: "b",
  KING: "k",
};

export function getFormatedPiece(piece, turn) {
  let isBlack = turn === "black";
  switch (piece) {
    case Piece.PAWN: {
      let val = isBlack ? Piece.PAWN : Piece.PAWN.toUpperCase();
      return val;
    }
    case Piece.QUEEN: {
      let val = isBlack ? Piece.QUEEN : Piece.QUEEN.toUpperCase();
      return val;
    }
    case Piece.ROCK: {
      let val = isBlack ? Piece.ROCK : Piece.ROCK.toUpperCase();
      return val;
    }
    case Piece.HORSE: {
      let val = isBlack ? Piece.HORSE : Piece.HORSE.toUpperCase();
      return val;
    }
    case Piece.BISHOP: {
      let val = isBlack ? Piece.BISHOP : Piece.BISHOP.toUpperCase();
      return val;
    }
    case Piece.KING: {
      let val = isBlack ? Piece.KING : Piece.KING.toUpperCase();
      return val;
    }
  }
}
