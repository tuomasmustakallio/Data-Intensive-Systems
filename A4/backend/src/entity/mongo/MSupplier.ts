import { Entity, Column, ObjectIdColumn, ObjectId } from "typeorm";

@Entity()
export class MSupplier {
  @ObjectIdColumn()
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
