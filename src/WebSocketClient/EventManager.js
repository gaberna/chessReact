import { makeMove } from "./TurnManager";

// let toSend = {
//   action: "",
//   data: {
//     board_id: "",
//   },
// };

export const responseMsje = (message, sendMje, sendJson) => {
  let recData = JSON.parse(message.data);
  if (recData.event === "ask_challenge") {
    let msjeToSend = {
      action: "accept_challenge",
      data: {
        board_id: recData.data.board_id,
      },
    };
    sendMje(msjeToSend);
  } else if (recData.event === "your_turn") {
    // const board = analizeBoard(recData.data.board);
    let moveToSend = makeMove(
      recData.data.actual_turn,
      recData.data.board_id,
      recData.data.turn_token,
      recData.data.board
    );
    sendJson(moveToSend);
  }
};
