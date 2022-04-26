import { axiosInstance } from "../axios";

interface IAuthPayload {
  email: string;
  password: string;
  code: number;
}

interface IRegisterPayload {
  email: string;
  password: string;
}

interface IUserAssign {
  userId: string;
  tokenId: string;
}

export class UserService {
  constructor() {}

  headers = {
    Authorization:
      typeof window !== "undefined" &&
      `Bearer ${localStorage.getItem("token")}`,
  };

  async login(authPayload: IAuthPayload) {
    const response = await axiosInstance.post("/user/login", {
      ...authPayload,
    });

    if (response.status >= 300) {
      throw new Error(response.data.message);
    }

    return response.data;
  }

  async register(registerPayload: IRegisterPayload) {
    const response = await axiosInstance.post("/user/add", {
      ...registerPayload,
    });

    if (response.status >= 300) {
      throw new Error(response.data.message);
    }

    return response.data;
  }

  async getUnassignedUsers() {
    const response = await axiosInstance.get("/user/unassigned", {
      headers: this.headers,
    });

    if (response.status >= 300) {
      throw new Error(response.data.message);
    }

    return response.data;
  }

  async assignKeyToUser(payload: IUserAssign) {
    const response = await axiosInstance.post(
      "/user/assign",
      { ...payload },
      {
        headers: this.headers,
      }
    );

    if (response.status >= 300) {
      throw new Error(response.data.message);
    }

    return response.data;
  }
}
