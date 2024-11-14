import * as express from "express";
import { Request, Response } from "express";
import { NY_DB, LA_DB, CH_DB } from "./data-source";
import { Customer } from "./entity/Customer";
import { Order } from "./entity/Order";
import { Product } from "./entity/Product";
import { Supplier } from "./entity/Supplier";
import { seedData } from "./seed";
import { DataSource } from "typeorm";
var cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

async function initializeDatabases() {
  await Promise.all([
    NY_DB.initialize(),
    LA_DB.initialize(),
    CH_DB.initialize(),
  ]);
  console.log("Databases initialized");

  await seedData(NY_DB, "new_york");
  await seedData(LA_DB, "los_angeles");
  await seedData(CH_DB, "chicago");
  console.log("Data seeded into each database");
}

app.get("/:location/customers", async (req: Request, res: Response) => {
  const { location } = req.params;
  const dataSource = getDataSource(location);

  if (!dataSource) {
    res.status(404).json({ error: "Location not found" });
  } else {
    const customers = await dataSource.getRepository(Customer).find();
    res.status(200).json(customers);
  }
});

app.get("/:location/orders", async (req: Request, res: Response) => {
  const { location } = req.params;
  const dataSource = getDataSource(location);

  if (!dataSource) {
    res.status(404).json({ error: "Location not found" });
  } else {
    const orders = await dataSource.getRepository(Order).find();
    res.status(200).json(orders);
  }
});

app.get("/:location/products", async (req: Request, res: Response) => {
  const { location } = req.params;
  const dataSource = getDataSource(location);

  if (!dataSource) {
    res.status(404).json({ error: "Location not found" });
  } else {
    const products = await dataSource.getRepository(Product).find();
    res.status(200).json(products);
  }
});

app.get("/:location/suppliers", async (req: Request, res: Response) => {
  const { location } = req.params;
  const dataSource = getDataSource(location);

  if (!dataSource) {
    res.status(404).json({ error: "Location not found" });
  } else {
    const suppliers = await dataSource.getRepository(Supplier).find();
    res.status(200).json(suppliers);
  }
});

function getDataSource(location: string): DataSource | null {
  switch (location.toLowerCase()) {
    case "new-york":
      return NY_DB;
    case "los-angeles":
      return LA_DB;
    case "chicago":
      return CH_DB;
    default:
      return null;
  }
}

const PORT = 8000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await initializeDatabases();
});
