import "reflect-metadata";
import { DataSource } from "typeorm";
import { Customer } from "./entity/Customer";
import { Order } from "./entity/Order";
import { Product } from "./entity/Product";
import { Supplier } from "./entity/Supplier";

export const NY_DB = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "",
  database: "NY_DB",
  synchronize: true,
  logging: false,
  entities: [Customer, Order, Product, Supplier],
  migrations: [],
  subscribers: [],
});
export const LA_DB = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "",
  database: "LA_DB",
  synchronize: true,
  logging: false,
  entities: [Customer, Order, Product, Supplier],
  migrations: [],
  subscribers: [],
});
export const CH_DB = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "",
  database: "CH_DB",
  synchronize: true,
  logging: false,
  entities: [Customer, Order, Product, Supplier],
  migrations: [],
  subscribers: [],
});
