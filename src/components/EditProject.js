import { Component } from "react";

// material ui
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// api connection
import api from "../utils/api.utils";

class EditProject extends Component {
  render = () => {
    return (
      <Container component="main" maxWidth="sm" style={styles.paper}>
        <Grid container xs={12}>
          <Grid item xs={12}>
            Component
          </Grid>
        </Grid>
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
};

export default EditProject;
