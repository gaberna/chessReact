import getPieceMovement from "../PieceMovement";

test("Test Piece movement", () => {
  let pieceToPlay = {
    srcCol: "0",
    srcRow: "4",
    id: "p",
  };
  let movement = getPieceMovement([], pieceToPlay, "black");

  expect(movement.toR).toEqual(6);
  expect(movement.toC).toEqual(0);
});
