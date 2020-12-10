import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  // useEffect,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEventManager } from "../WebSocketClient/EventManager";

export const Game = ({ socketUrl }) => {
  const [userList, setuserList] = useState([]);
  const [lastData, setLastData] = useState("");

  // Connect to WS
  const { sendMessage, readyState, getWebSocket } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
  });

  const [lastMessage] = useEventManager(getWebSocket);

  const messageHistory = useRef([]);
  useEffect(() => {
    if (lastMessage) {
      messageHistory.current = [lastMessage, ...messageHistory.current];
    }
  }, [lastMessage]);

  const handleClickSendMessage = useCallback(
    () => (
      sendMessage({
        action: "login",
        data: {},
      }),
      []
    )
  );

  const handleClickChallengue = useCallback(
    () => (
      sendMessage({
        action: "challenge",
        data: {
          username: "gaberna",
          message: "WAR!",
        },
      }),
      []
    )
  );

  const handleClickAbort = (lastData) => {
    console.log("lastData:", lastData);
    sendMessage({
      action: "abort",
      data: {
        board_id: lastData.board_id,
      },
    });
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      {console.log(userList)}
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
        onClick={handleClickAbort(lastData)}
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
