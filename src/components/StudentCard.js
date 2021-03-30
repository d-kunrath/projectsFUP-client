import { Component } from "react";

// material ui
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmIcon from "@material-ui/icons/Check";
import TextField from "@material-ui/core/TextField";

// api connection
import api from "../utils/api.utils";

class StudentCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: this.props.name,
      edit: false,
    };
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit,
    });
  };

  handleInput = (event) => {
    this.setState({
      editName: event.target.value,
    });
  };

  editStudent = async () => {
    const edit = { ...this.props, name: this.state.editName };
    await api.editStudent(this.props._id, edit);
    this.setState({
      editName: "",
      edit: false,
    });
    this.props.loadStudentList();
  };

  render = () => {
    const { name, projects } = this.props;
    const projectsText = projects.map((project) => project.name).join(" ");
    return (
      <ListItem>
        {this.state.edit ? (
          <TextField
            placeholder={name}
            onChange={this.handleInput}
            fullWidth
            defaultValue={this.state.editName}
          />
        ) : (
          <ListItemText primary={name} secondary={projectsText} />
        )}
        <ListItemSecondaryAction>
          {this.state.edit && (
            <IconButton edge="end" aria-label="edit" onClick={this.editStudent}>
              <ConfirmIcon />
            </IconButton>
          )}
          <IconButton edge="end" aria-label="edit" onClick={this.toggleEdit}>
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };
}

export default StudentCard;
