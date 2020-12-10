const { useEventManager } = require("../EventManager");
import { renderHook, act } from "@testing-library/react-hooks";

const getWebSocket = () => ({
  onmessage: jest.fn(),
  send: jest.fn(),
});

test("Test Event manager", () => {
  const message = {
    event: "ask_challenge",
    data: `{"board_id": "62796b3c-0963-4237-88b6-d852d695de78"}`,
  };
  const { result } = renderHook(() => useEventManager(getWebSocket));
  const [_, websocket] = result.current;

  act(() => {
    websocket.onmessage(message);
  });

  expect(result.current[0]).toEqual(message);

  // const response = {
  //   action: "accept_challenge",
  //   data: {
  //     board_id: "62796b3c-0963-4237-88b6-d852d695de78",
  //   },
  // };

  expect(websocket.send).toHaveBeenCalled();
});
