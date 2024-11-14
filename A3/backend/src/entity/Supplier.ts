import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  supplierId: number;

  @Column()
  supplierName: string;

  @Column()
  contact: string;

  @Column()
  city: string;

  @Column()
  productId: number;
}
