import { Component } from "react";

// components

// material ui
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

// api connection
import api from "../utils/api.utils";

class ProjectCard extends Component {
  deleteProject = async () => {
    try {
      await api.deleteProject(this.props._id);
      this.props.loadProjectsList();
    } catch (error) {
      console.error(error);
    }
  };

  render = () => {
    const { title, students } = this.props;
    const studentsText = students.map((student) => student.name).join(", ");
    return (
      <ListItem>
        <Link href={`/projects/${this.props._id}`}>
          <ListItemText primary={title} secondary={studentsText} />
        </Link>
        <ListItemSecondaryAction>
          <Link href={`/projects/edit/${this.props._id}`}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={this.deleteProject}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };
}

export default ProjectCard;
