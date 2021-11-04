import { Injectable } from "../core";
import { Repository } from "typeorm";
import { UsersEntity } from "./entities/users_entity";

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {}
