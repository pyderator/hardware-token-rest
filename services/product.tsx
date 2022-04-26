import { axiosInstance } from "../axios";

interface IKey {
  productKey: string;
}
export class ProductService {
  constructor() {}

  headers = {
    Authorization:
      typeof window !== "undefined" &&
      `Bearer ${localStorage.getItem("token")}`,
  };

  async addKey(addKeyPayload: IKey) {
    const response = await axiosInstance.post(
      "/product-key/add",
      { ...addKeyPayload },
      { headers: this.headers }
    );

    if (response.status >= 300) {
      throw new Error(response.data.message);
    }

    return response.data;
  }

  async getKeyDetails(getKeyPayload: IKey) {
    const response = await axiosInstance.get(
      `/product-key/${getKeyPayload.productKey}`,
      {
        headers: this.headers,
      }
    );

    if (response.status >= 300) {
      throw new Error(response.data.message);
    }

    return response.data;
  }

  async getUnassignedKeys() {
    const response = await axiosInstance.get("/product-key/unassigned", {
      headers: this.headers,
    });

    if (response.status >= 300) {
      throw new Error(response.data.message);
    }

    return response.data;
  }
}
