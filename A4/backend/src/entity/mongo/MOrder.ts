import { Entity, Column, ObjectIdColumn, ObjectId } from "typeorm";

@Entity()
export class MOrder {
  @ObjectIdColumn()
  orderId: number;

  @Column()
  customerId: number;

  @Column()
  productId: number;

  @Column({ type: "date" })
  orderDate: string;

  @Column()
  quantity: number;
}
