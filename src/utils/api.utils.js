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
}

export default new Api();
