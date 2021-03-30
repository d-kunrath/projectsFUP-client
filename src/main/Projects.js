import { Component } from "react";
import { Link } from "react-router-dom";

// components
import ProjectCard from "../components/ProjectCard";

// material ui
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
// import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import IconAdd from "@material-ui/icons/Add";

// api connection
import api from "../utils/api.utils";

class Projects extends Component {
  state = {
    projects: [],
    search: "",
  };

  loadProjectsList = async () => {
    try {
      const projects = await api.getProjects();
      this.setState({
        projects,
      });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount = () => {
    this.loadProjectsList();
  };

  render = () => {
    return (
      <Container component="main" maxWidth="sm" style={styles.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List>
              <Link to="/new-project">
                <Button style={styles.addBtn} fullWidth>
                  <IconAdd />
                </Button>
              </Link>
              {this.state.projects.map((project) => {
                return (
                  <ProjectCard
                    key={project._id}
                    {...project}
                    loadProjectsList={this.loadProjectsList}
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
  addBtn: {
    color: "grey",
  },
};

export default Projects;
