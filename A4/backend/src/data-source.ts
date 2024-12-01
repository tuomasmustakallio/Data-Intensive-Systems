import "reflect-metadata";
import { DataSource } from "typeorm";
import { Customer } from "./entity/sql/Customer";
import { Order } from "./entity/sql/Order";
import { Product } from "./entity/sql/Product";
import { Supplier } from "./entity/sql/Supplier";
import { MCustomer } from "./entity/mongo/MCustomer";
import { MOrder } from "./entity/mongo/MOrder";
import { MProduct } from "./entity/mongo/MProduct";
import { MSupplier } from "./entity/mongo/MSupplier";

export const PSQL_DB = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "",
  database: "PSQL_DB",
  synchronize: true,
  logging: false,
  entities: [Customer, Order, Product, Supplier],
});
export const MONGO_DB = new DataSource({
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "MONGO_DB",
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
  entities: [MCustomer, MOrder, MProduct, MSupplier],
});
