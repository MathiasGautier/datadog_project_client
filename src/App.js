import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import MainPage from "./pages/Main";

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
