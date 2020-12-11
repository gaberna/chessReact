import "./App.css";
import { Game } from "./screens/Game";

const Constants = {
  socketUrl:
    "ws://megachess.herokuapp.com/service?authtoken=b12fdd43-930d-4f8d-8f41-24cdae62ba85",
};

function App() {
  return (
    <div className="App">
      <Game socketUrl={Constants.socketUrl} />
    </div>
  );
}

export default App;
