import { BadRequestException } from "../core/exceptions";
import { Router } from "../core";
import { UsersService } from "./users_service";

@Router.controller("/users")
export class UserController {
  constructor(private usersService: UsersService) {}

  @Router.get("")
  getAll() {
    // throw new BadRequestException("User not found");
    return this.usersService.getAll();
  }
}
