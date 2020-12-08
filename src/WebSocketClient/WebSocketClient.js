import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  // useEffect,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import whitePiece from "../Pieces/whitePiece";
import blackPiece from "../Pieces/blackPiece";

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
      responseMsje(message);
      setuserList(JSON.parse(message.data).data.users_list);
      setLastData(JSON.parse(message.data));
    },
  });

  // //RANDOM MOV.
  // function getRandomIntInclusive(min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   let res = Math.floor(Math.random() * (max - min + 1) + min);
  //   return res;
  // }

  //ANALIZAR BOARD
  function analizeBoard(board) {
    let boardArr = [];
    let index = 0;

    while (index * 16 < 256) {
      boardArr.push(board.substring(index * 16, index * 16 + 16).split(""));
      index++;
    }
    return boardArr;
  }

  //REALIZAR MOVIMIENTO
  function makeMove(actual_turn, board_id, turn_token, board) {
    if (actual_turn === "black") {
      const move = blackPiece(board);
      sendJsonMessage({
        action: "move",
        data: {
          board_id: board_id,
          turn_token: turn_token,
          from_row: move.fromR,
          from_col: move.fromC,
          to_row: move.toR,
          to_col: move.toC,
        },
      });
    } else {
      const move = whitePiece(board, actual_turn);

      sendJsonMessage({
        action: "move",
        data: {
          board_id: board_id,
          turn_token: turn_token,
          from_row: move.fromR,
          from_col: move.fromC,
          to_row: move.toR,
          to_col: move.toC,
        },
      });
    }
  }

  //RESPONDER MENSAJE
  const responseMsje = (message) => {
    let recData = JSON.parse(message.data);
    if (recData.event === "ask_challenge") {
      sendJsonMessage({
        action: "accept_challenge",
        data: {
          board_id: recData.data.board_id,
        },
      });
    } else if (recData.event === "your_turn") {
      const board = analizeBoard(recData.data.board);
      // const move = selectPiece(board);

      makeMove(
        recData.data.actual_turn,
        recData.data.board_id,
        recData.data.turn_token,
        board
      );
    }
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
    console.log(lastData);
    sendMessage({
      action: "abort",
      data: {
        board_id: lastData,
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
