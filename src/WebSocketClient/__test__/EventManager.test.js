const { useEventManager } = require("../EventManager");
import { renderHook, act } from "@testing-library/react-hooks";

const webSocketConnection = {
  onmessage: jest.fn(),
  send: jest.fn(),
};

test("Test Event manager", () => {

  const message = {
    data: `{"data": {"board_id": "62796b3c-0963-4237-88b6-d852d695de78"} , "event": "ask_challenge"}`,
  };
  const { result } = renderHook(() => useEventManager(webSocketConnection));
  
  act(() => {
    webSocketConnection.onmessage(message);
  });

  const { lastMessage } = result.current;
  expect(lastMessage).toEqual(message);
  
  const response = {
    action: "accept_challenge",
    data: {
        board_id: "62796b3c-0963-4237-88b6-d852d695de78",
      },
  };
      
  expect(webSocketConnection.send).toHaveBeenCalledWith(JSON.stringify(response));

});
