import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import Navbar from "./navbar";
import MainPage from "./pages/main";


function App() {
  return (
    <div>
     <Navbar/>
     <MainPage/>
    </div>
  );
}

export default App;
