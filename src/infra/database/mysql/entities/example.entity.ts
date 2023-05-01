import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
    name: "example",
})
export class Example {
  @PrimaryGeneratedColumn()
      id: number;

  @Column({ type: "varchar" })
      name: string;
}
