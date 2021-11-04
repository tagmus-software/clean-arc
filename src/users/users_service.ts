import { Injectable } from "../core";
import { UsersRepository } from "./users_repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAll() {
    console.log(this.usersRepository);
    return ["dsa"];
  }
}
