import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  // useEffect,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { responseMsje } from "./EventManager";

export const WebSocketClient = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState(
    "ws://megachess.herokuapp.com/service?authtoken=b12fdd43-930d-4f8d-8f41-24cdae62ba85"
  );
  const messageHistory = useRef([]);
  const [userList, setuserList] = useState([]);
  const [lastData, setLastData] = useState("");
  const {
    sendMessage,
    lastMessage,
    readyState,
    sendJsonMessage,
  } = useWebSocket(socketUrl, {
    shouldReconnect: (closeEvent) => true,
    onMessage: (message) => {
      console.log("new message received: " + message.data);
      handleSend(message, sendJson(), sendMje());
      setuserList(JSON.parse(message.data).data.users_list);
      setLastData(JSON.parse(message.data));
    },
  });

  const sendMje = (mje) => {
    sendMessage({
      action: mje.action,
      data: mje.data,
    });
  };

  const sendJson = (mje) => {
    sendJsonMessage({
      action: mje.action,
      data: {
        board_id: mje.data.board_id,
      },
    });
  };

  messageHistory.current = useMemo(
    () => messageHistory.current.concat(lastMessage),
    [lastMessage]
  );

  const handleSend = (message) => {
    responseMsje(message);
  };

  messageHistory.current = useMemo(
    () => messageHistory.current.concat(lastMessage),
    [lastMessage]
  );

  const handleClickChangeSocketUrl = useCallback(
    () =>
      setSocketUrl(
        "ws://megachess.herokuapp.com/service?authtoken=b12fdd43-930d-4f8d-8f41-24cdae62ba85"
      ),
    []
  );

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
      <button onClick={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </button>
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
        <span>
          {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
        </span>
        {/* <ul>
        {messageHistory.current.map((message, idx) => (
          <span key={idx}>{message.data}</span>
        ))}
      </ul> */}
      </div>
    </div>
  );
};
