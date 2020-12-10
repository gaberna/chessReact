import { useState } from "react";
import { makeMove } from "./TurnManager";

export const useEventManager = (getWebSocket) => {
  const [lastMessage, setLastMessage] = useState(null);
  const websocket = getWebSocket();
  if (websocket) {
    websocket.onmessage = (message) => {
      setLastMessage(message);
      console.log("new message received: " + message.data);
      let recData = JSON.parse(message.data);
      if (recData.event === "ask_challenge") {
        let msjeToSend = {
          action: "accept_challenge",
          data: {
            board_id: recData.data.board_id,
          },
        };
        websocket.send(JSON.stringify(msjeToSend));
      } else if (recData.event === "your_turn") {
        let moveToSend = makeMove(
          recData.data.actual_turn,
          recData.data.board_id,
          recData.data.turn_token,
          recData.data.board
        );
        websocket.send(JSON.stringify(moveToSend));
      }
    };
  }
  return [lastMessage, websocket];
};
