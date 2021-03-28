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
      throw new Error("Login error");
    }
  };

  signup = async (payload) => {
    try {
      await this.api.post("/auth/signup", payload);
    } catch (error) {
      throw new Error();
    }
  };

  // async getAll = () => {

  // }

  // async getById = () => {

  // }

  // async update = (id, payload) => {
  //   const updated = await this.api.put(`/${id}`, payload);
  //   return updated;
  // }
}

export default new Api();
