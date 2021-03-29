import { Component } from "react";

// components
import StudentCard from "../components/StudentCard";

// material ui
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";

// api connection
import api from "../utils/api.utils";

class Students extends Component {
  state = {
    students: [],
    name: "",
  };

  sortByName = (arr) => {
    return arr.sort((a, b) => {
      return a.name.toLowerCase() > b.name.toLowerCase()
        ? 1
        : a.name.toLowerCase() < b.name.toLowerCase()
        ? -1
        : 0;
    });
  };

  loadStudentList = async () => {
    const studentsFromDB = await api.getStudents();
    const students = this.sortByName(studentsFromDB);
    this.setState({
      students,
    });
  };

  addStudent = async () => {
    const { name } = this.state;
    try {
      await api.createStudent({ name });
      const students = await api.getStudents();
      this.setState({
        students,
        name: "",
      });
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

  componentDidMount = async () => {
    this.loadStudentList();
  };

  render = () => {
    return (
      <Container component="main" maxWidth="sm" style={styles.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={10}>
            <TextField
              label="Add Student"
              type="text"
              autoFocus
              fullWidth
              name="name"
              variant="outlined"
              onChange={this.handleInput}
              value={this.state.name}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              fullWidth
              variant="outlined"
              style={styles.btn}
              onClick={this.addStudent}
            >
              <AddIcon />
            </Button>
          </Grid>
          <Grid xs={12}>
            <List>
              {this.state.students.map((student) => {
                return (
                  <StudentCard
                    {...student}
                    loadStudentList={this.loadStudentList}
                  />
                );
              })}
            </List>
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
  btn: {
    height: "100%",
  },
};

export default Students;
