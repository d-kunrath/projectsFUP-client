import React, { Component } from "react";

// material ui
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

// api connection
import api from "../utils/api.utils";

class ProjectDetails extends Component {
  state = {
    project: {},
    showStudents: false,
    newFup: "",
  };

  loadProject = async () => {
    const { id } = this.props.match.params;
    const project = await api.getOneProject(id);
    this.setState({
      project,
    });
  };

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    console.log("submit!");
    event.preventDefault();
    try {
      const payload = {
        content: this.state.newFup,
        projectId: this.state.project._id,
      };
      await api.createFup(payload);
      this.loadProject();
    } catch (error) {
      console.error(error);
    }
  };

  formatDate = (date) => {
    if (date) {
      const date = this.state.project.presentation.split("T")[0];
      const dateArr = date.split("-");
      return `${dateArr[2]}/${dateArr[1]}/${dateArr[0].slice(-2)}`;
    }
  };

  formatStudents = () => {
    const { students } = this.state.project;
    if (students) {
      return students.map((student) => student.name).join(", ");
    }
  };

  componentDidMount = () => {
    this.loadProject();
  };

  render() {
    return (
      <Container component="main" maxWidth="sm" style={styles.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={10}>
            <Typography component="h1" variant="h3">
              {this.state.project.title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <div style={styles.box}>
              <Typography component="small" variant="caption">
                Presentation
              </Typography>
              <Typography component="span">
                {this.formatDate(this.state.project.presentation)}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            {this.formatStudents()}
          </Grid>

          {this.state.project.followUps &&
            this.state.project.followUps.map((fup) => {
              return (
                <Grid key={fup._id} item xs={12}>
                  <Typography component="small" variant="caption">
                    {this.formatDate(fup.createdAt)}:
                  </Typography>
                  <Typography component="span">{fup.content}</Typography>
                </Grid>
              );
            })}
          <form style={styles.form}>
            <Grid item xs={12}>
              <TextField
                label="New follow up"
                variant="outlined"
                type="text"
                name="newFup"
                row={3}
                required
                fullWidth
                onChange={this.handleInput}
                value={this.state.newFup}
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "5px" }}>
              <Button
                onClick={this.handleSubmit}
                variant="contained"
                color="primary"
                fullWidth
              >
                save
              </Button>
            </Grid>
          </form>
        </Grid>
      </Container>
    );
  }
}

const styles = {
  paper: {
    marginTop: "4rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  form: {
    width: "100%",
    marginTop: "5px",
  },
};
export default ProjectDetails;
