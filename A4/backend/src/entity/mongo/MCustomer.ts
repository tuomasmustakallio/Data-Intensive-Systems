import { Entity, Column, ObjectIdColumn, ObjectId } from "typeorm";

@Entity()
export class MCustomer {
  @ObjectIdColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  city: string;
}
