import { Component } from "react";

class Login extends Component {
  render = () => {
    return (
      <div>
        <h2>Login</h2>
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <button>Log me in!</button>
        </form>
      </div>
    );
  };
}

export default Login;
