// import "./App.css";
import { Component } from "react";
import { Switch, Route } from "react-router-dom";

// import main components
import Signup from "./main/Signup";
import Login from "./main/Login";

// import other components
import Navbar from "./components/Navbar";

class App extends Component {
  render = () => {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  };
}

export default App;
