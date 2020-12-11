import { useState } from "react";
import { makeMove } from "./TurnManager";

// Handles events recieved from WS
export const useEventManager = (webSocketConnection) => {
  const [lastMessage, setLastMessage] = useState(null);
  if (webSocketConnection) {
    webSocketConnection.onmessage = (message) => {
      setLastMessage(message); // Saved last recieved message
      console.log("new message received: " + message.data);
      let recData = JSON.parse(message.data);
      if (recData.event === "ask_challenge") {
        let msjeToSend = {
          action: "accept_challenge",
          data: {
            board_id: recData.data.board_id,
          },
        };
        webSocketConnection.send(JSON.stringify(msjeToSend));
      } else if (recData.event === "your_turn") {
        let moveToSend = makeMove(
          recData.data.actual_turn,
          recData.data.board_id,
          recData.data.turn_token,
          recData.data.board
        );
        webSocketConnection.send(JSON.stringify(moveToSend));
      }
    };
  }
  return { lastMessage };
};
