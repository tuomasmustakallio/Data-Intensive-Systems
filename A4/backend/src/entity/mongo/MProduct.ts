import { Entity, Column, ObjectIdColumn, ObjectId } from "typeorm";

@Entity()
export class MProduct {
  @ObjectIdColumn()
  productId: number;

  @Column()
  productName: string;

  @Column()
  category: string;

  @Column("decimal")
  price: number;
}
