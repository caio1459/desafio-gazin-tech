import axios, { AxiosInstance } from "axios";

class ApiConfig {
  runApi(): AxiosInstance {
    return axios.create({
      baseURL: "http://localhost:8000/api",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new ApiConfig();
