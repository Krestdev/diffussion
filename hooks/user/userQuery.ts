import { BaseQuery } from "../baseQuery";
import { UserT } from "./type";

class UserQuery extends BaseQuery<UserT, UserT> {
  constructor() {
    super("/user");
  }

  login = async (body: UserT) => {
    try {
      const response = await this.api.post(`${this.url}/login`, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  register = async (body: UserT) => {
    try {
      const response = await this.api.post(`${this.url}/register`, body);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const userQuery = new UserQuery();