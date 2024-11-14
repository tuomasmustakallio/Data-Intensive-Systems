import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
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
