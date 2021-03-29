import { Component } from "react";

// material ui
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// api connection
import api from "../utils/api.utils";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    message: "",
  };

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { username, password, confirmPassword } = this.state;
      if (password !== confirmPassword) {
        this.setState({
          message: "Password and confirmation do not match.",
        });
        return;
      }
      this.setState({
        username: "",
        password: "",
        confirmPassword: "",
        errorMessage: "",
      });
      await api.signup({
        username,
        password,
      });
      this.props.history.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  render = () => {
    return (
      <Container component="main" maxWidth="xs" style={styles.paper}>
        <Typography component="h1" variant="h4">
          Signup
        </Typography>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                required
                fullWidth
                autoFocus
                type="text"
                name="username"
                onChange={this.handleInput}
                value={this.state.username}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                variant="outlined"
                required
                fullWidth
                type="password"
                name="password"
                onChange={this.handleInput}
                value={this.state.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Confirm Password"
                variant="outlined"
                required
                fullWidth
                type="password"
                name="confirmPassword"
                onChange={this.handleInput}
                value={this.state.confirmPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={styles.submit}
          >
            sign me up!
          </Button>
        </form>
        {this.state.message && (
          <div style={styles.error}>{this.state.message}</div>
        )}
      </Container>
    );
  };
}

const styles = {
  paper: {
    marginTop: "4rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: "1.5rem",
  },
  submit: {
    margin: "1.5rem 0 1rem",
  },
  error: {
    border: "1px solid red",
    color: "red",
    textAlign: "center",
    padding: "10px",
    borderRadius: "3px",
    width: "100%",
  },
};

export default Signup;
