import { Piece } from "../pieces.js";
import { isPawnFirstMove } from "./PieceSelectionManager.js";

const PieceMovements = {
  [Piece.PAWN]: {
    vertical: 1,
    horizontal: 0,
  },
  [Piece.QUEEN]: {
    vertical: 1,
    horizontal: 1,
  },
};

const MovementsByTurn = {
  black: 1,
  white: -1,
};

// Defines next movement
export default function getPieceMovement(selectedPiece, actual_turn) {
  const { id } = selectedPiece;

  const movements = PieceMovements[id.toLowerCase()];

  const pawnFactor =
    id.toLowerCase() === Piece.PAWN &&
    isPawnFirstMove(selectedPiece.srcRow, actual_turn)
      ? 2
      : 1;

  const movementsByTurn = MovementsByTurn[actual_turn];

  const nextMove = {
    fromC: selectedPiece.srcCol,
    fromR: selectedPiece.srcRow,
    toC: selectedPiece.srcCol + movements.horizontal,
    toR:
      selectedPiece.srcRow + movements.vertical * pawnFactor * movementsByTurn,
  };

  return nextMove;
}
