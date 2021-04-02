import axios from "axios";

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: "https://fupprojects.herokuapp.com/api",
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`,
          };
        }
        return config;
      },
      (error) => {
        console.error(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        localStorage.removeItem("token");
        window.location = "/login";
      }
    );
  }

  login = async (payload) => {
    try {
      const { data } = await this.api.post("/auth/login", payload);
      const { token } = data;
      localStorage.setItem("token", token);
    } catch (error) {
      throw new Error(error);
    }
  };

  signup = async (payload) => {
    try {
      await this.api.post("/auth/signup", payload);
    } catch (error) {
      throw new Error("Signup error");
    }
  };

  getStudents = async () => {
    try {
      const students = await this.api.get("/students/list");
      return students.data;
    } catch (error) {
      throw new Error("Cound not get students");
    }
  };

  createStudent = async (payload) => {
    try {
      const newStudent = await this.api.post("/students", payload);
      return newStudent.data;
    } catch (error) {
      throw new Error("Cound not create student");
    }
  };

  editStudent = async (id, payload) => {
    try {
      const updatedStudent = await this.api.put(`/students/${id}`, payload);
      return updatedStudent.data;
    } catch (error) {
      throw new Error("Could not edit student");
    }
  };

  getProjects = async () => {
    try {
      const projects = await this.api.get("/projects/list");
      return projects.data;
    } catch (error) {
      throw new Error("Could not get projects");
    }
  };

  queryProject = async (query) => {
    try {
      const projects = await this.api.get(`/projects/list/?title=${query}`);
      return projects.data;
    } catch (error) {
      throw new Error("Could not query project");
    }
  };

  createProject = async (payload) => {
    try {
      const project = await this.api.post("/projects", payload);
      return project.data;
    } catch (error) {
      throw new Error("Could not create project");
    }
  };

  getOneProject = async (id) => {
    try {
      const project = await this.api.get(`/projects/${id}`);
      return project.data;
    } catch (error) {
      throw new Error("Could not find project");
    }
  };

  editProject = async (id, payload) => {
    try {
      const project = await this.api.put(`/projects/${id}`, payload);
      return project.data;
    } catch (error) {
      throw new Error("Could not edit project");
    }
  };

  addStudentToProject = async (id, studentId) => {
    try {
      const project = await this.api.post(`/projects/add-student/${id}`, {
        studentId,
      });
      return project.data;
    } catch (error) {
      throw new Error("Could not add student to project");
    }
  };

  deleteProject = async (id) => {
    try {
      await this.api.delete(`/projects/${id}`);
    } catch (error) {
      throw new Error("Could not delete project");
    }
  };

  createFup = async (payload) => {
    try {
      const newFup = await this.api.post("/fups", payload);
      return newFup.data;
    } catch (error) {
      throw new Error("Could not create follow up");
    }
  };
}

export default new Api();
