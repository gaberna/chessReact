import getPieceMovement from "../PieceMovement";

test("Test Piece movement for black Pawn initial place", () => {
  let pieceToPlay = {
    srcCol: 0,
    srcRow: 3,
    id: "p",
  };
  let movement = getPieceMovement(pieceToPlay, "black");

  expect(movement.toR).toEqual(5);
  expect(movement.toC).toEqual(0);
});

test("Test Piece movement for white Pawn initial place", () => {
  let pieceToPlay = {
    srcCol: 0,
    srcRow: 12,
    id: "p",
  };
  let movement = getPieceMovement(pieceToPlay, "white");

  expect(movement.toR).toEqual(10);
  expect(movement.toC).toEqual(0);
});

test("Test Piece movement for black Pawn not initial place", () => {
  let pieceToPlay = {
    srcCol: 0,
    srcRow: 5,
    id: "p",
  };
  let movement = getPieceMovement(pieceToPlay, "black");

  expect(movement.toR).toEqual(6);
  expect(movement.toC).toEqual(0);
});

test("Test Piece movement for white Pawn not initial place", () => {
  let pieceToPlay = {
    srcCol: 6,
    srcRow: 10,
    id: "p",
  };
  let movement = getPieceMovement(pieceToPlay, "white");

  expect(movement.toR).toEqual(9);
  expect(movement.toC).toEqual(6);
});

test("Test Piece movement for black Queen", () => {
  let pieceToPlay = {
    srcCol: 11,
    srcRow: 7,
    id: "Q",
  };
  let movement = getPieceMovement(pieceToPlay, "black");

  expect(movement.toR).toEqual(8);
  expect(movement.toC).toEqual(12);
});

test("Test Piece movement for white Queen", () => {
  let pieceToPlay = {
    srcCol: 0,
    srcRow: 8,
    id: "Q",
  };
  let movement = getPieceMovement(pieceToPlay, "white");

  expect(movement.toR).toEqual(7);
  expect(movement.toC).toEqual(1);
});
