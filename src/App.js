import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import MainPage from "./pages/Main.jsx";

console.log(process.env)

function App() {
  return (
    <>
    <Switch>
 
    <Route exact path="/" render={(props) => <Landing {...props} />} />
    <Route
          exact
          path="/send_stuff"
          render={(props) => <MainPage {...props} />}
        />

    </Switch>
    </>
  );
}

export default App;
