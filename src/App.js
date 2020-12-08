import logo from "./logo.svg";
import "./App.css";
import { WebSocketClient } from "./WebSocketClient/WebSocketClient";

function App() {
  return (
    <div className="App">
      <WebSocketClient />
    </div>
  );
}

export default App;
