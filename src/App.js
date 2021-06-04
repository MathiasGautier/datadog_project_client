import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import $ from "jquery";
import Popper from "popper.js";
import Navbar from "./navbar";
import MainPage from "./pages/main";

console.log(process.env)

function App() {
  return (
    <>
    <Switch>
 
    <Route exact path="/" render={(props) => <Landing {...props} />} />
    <Route
          exact
          path="/send_logs"
          render={(props) => <MainPage {...props} />}
        />
     {/* <Navbar/>
     <MainPage/> */}

    </Switch>
    </>
  );
}

export default App;
