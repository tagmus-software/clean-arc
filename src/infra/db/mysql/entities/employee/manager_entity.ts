import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Employee } from "./employee_entity";

export class Manager extends Employee {}
