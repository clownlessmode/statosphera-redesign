// import { api } from "@shared/api/api";

import { User } from "../config";

export class UsersService {
  static async getUsers(): Promise<User[]> {
    // const response = await api.get("/user");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Doe" },
        ]);
      }, 1000);
    });
  }
}
