import { Component } from "react";

// material ui
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { FormControl, Select, MenuItem } from "@material-ui/core";

import { Delete as IconDelete, Add as IconAdd } from "@material-ui/icons";

// api connection
import api from "../utils/api.utils";

class NewProject extends Component {
  state = {
    studentsList: [],
    title: "",
    date: "",
    students: [],
    selectStudent: "",
  };

  handleSelect = (event) => {
    this.setState({
      selectStudent: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { title, date } = this.state;
      const projectPayload = {
        title,
        presentation: date,
      };
      console.log(projectPayload);
      const newProject = await api.createProject(projectPayload);
      console.log(newProject);
      this.state.students.forEach(async (student) => {
        console.log(student);
        await api.addStudentToProject(newProject._id, student._id);
      });
      this.setState({
        studentsList: [],
        title: "",
        date: "",
        students: [],
        selectStudent: "",
      });
      this.props.history.push("/projects");
    } catch (error) {
      console.error(error);
    }
  };

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  addStudent = () => {
    const tempStudent = this.state.studentsList.find(
      (student) => student._id === this.state.selectStudent
    );
    const tempStudents = [...this.state.students];
    tempStudents.push(tempStudent);
    this.setState({
      students: tempStudents,
    });
  };

  removeStudent = (id) => {
    const tempStudents = [...this.state.students];
    const index = tempStudents.findIndex((student) => student._id === id);
    tempStudents.splice(index, 1);
    this.setState({
      students: tempStudents,
    });
  };

  loadStudentsList = async () => {
    try {
      const studentsList = await api.getStudents();
      this.setState({
        studentsList,
      });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount = () => {
    this.loadStudentsList();
  };

  render = () => {
    return (
      <Container component="main" maxWidth="sm" style={styles.paper}>
        <form style={styles.form} onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Title"
                variant="outlined"
                name="title"
                required
                fullWidth
                autoFocus
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Presentation Date"
                type="date"
                name="date"
                InputLabelProps={{ shrink: true }}
                onChange={this.handleInput}
                value={this.state.date}
              />
            </Grid>
            <Grid item xs={12}>
              <List>
                {this.state.students.map((student) => {
                  return (
                    <ListItem key={student._id}>
                      <ListItemText primary={student.name} />
                      <ListItemSecondaryAction>
                        <Button onClick={() => this.removeStudent(student._id)}>
                          <IconDelete />
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
            <Grid item xs={10}>
              <InputLabel shrink>Add Student</InputLabel>
              <FormControl fullWidth>
                <Select
                  value={this.state.selectStudent}
                  onChange={this.handleSelect}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled></MenuItem>
                  {this.state.studentsList.map((student) => {
                    return (
                      <MenuItem key={student._id} value={student._id}>
                        {student.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Button
                fullWidth
                onClick={this.addStudent}
                variant="outlined"
                style={styles.btn}
              >
                <IconAdd />
              </Button>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            style={styles.btn}
            onClick={this.handleSubmit}
            fullWidth
          >
            add new project
          </Button>
        </form>
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
  btn: {
    margin: "1.5rem 0 1rem",
  },
};

export default NewProject;
