import React, { useState, useCallback, useRef, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEventManager } from "../WebSocketClient/EventManager";

export const Game = ({ socketUrl }) => {
  // Connect to WS
  const { readyState, getWebSocket, sendJsonMessage } = useWebSocket(
    socketUrl,
    {
      shouldReconnect: () => true,
    }
  );

  const [mje, setMje] = useState("");

  const webSocketConnection = getWebSocket();

  const { lastMessage } = useEventManager(webSocketConnection);

  // Log  recieved message history
  const messageHistory = useRef([]);
  useEffect(() => {
    if (lastMessage) {
      messageHistory.current = [lastMessage, ...messageHistory.current];
      setMje(JSON.parse(lastMessage.data));
    }
  }, [lastMessage]);

  // Login action
  const handleClickSendMessage = useCallback(
    () => (
      sendJsonMessage({
        action: "login",
        data: {},
      }),
      []
    )
  );

  // Challenge action
  const handleClickChallengue = useCallback(
    () => (
      sendJsonMessage({
        action: "challenge",
        data: {
          username: "gaberna",
          message: "WAR!",
        },
      }),
      []
    )
  );

  // Abort action
  const handleClickAbort = useCallback(
    () => (
      sendJsonMessage({
        action: "abort",
        data: {
          board_id: mje?.data.board_id,
        },
      }),
      []
    )
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div className="App">
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        LOGIN
      </button>
      <button
        onClick={handleClickChallengue}
        disabled={readyState !== ReadyState.OPEN}
      >
        CHALLENGUE User
      </button>
      <button
        onClick={handleClickAbort}
        disabled={readyState !== ReadyState.OPEN}
      >
        Abort!
      </button>

      <hr />
      <div>
        <span>The WebSocket is currently {connectionStatus}</span>
        <br />
        <span>
          {lastMessage ? (
            <span>
              Last message: <br />
              {lastMessage.data}
            </span>
          ) : null}
        </span>
        <br />
        <ul>
          <span>History:</span> <br />
          {messageHistory.current.map((message, idx) => (
            <>
              <span key={idx}>{message.data}</span>
              <br />
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};
