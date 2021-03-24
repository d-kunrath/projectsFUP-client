import { Component } from "react";

class Signup extends Component {
  render = () => {
    return (
      <div>
        <h2>Signup</h2>
        <form>
          <div>
            <label htmlfor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" name="confirmPassword" />
          </div>
          <button>sign me up!</button>
        </form>
      </div>
    );
  };
}

export default Signup;
