import * as express from "express";
import { Request, Response } from "express";
import { PSQL_DB, MONGO_DB } from "./data-source";
import { Customer } from "./entity/sql/Customer";
import { seedData } from "./seed";
import { DataSource } from "typeorm";
import { MCustomer } from "./entity/mongo/MCustomer";
import { ObjectId } from "mongodb";
var cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

async function initializeDatabases() {
  await Promise.all([PSQL_DB.initialize(), MONGO_DB.initialize()]);
  console.log("Databases initialized");

  await seedData(PSQL_DB, "new_york");
  await seedData(MONGO_DB, "los_angeles");
  console.log("Data seeded into each database");
}

app.get("/:location/customers", async (req: Request, res: Response) => {
  const { location } = req.params;
  const dataSource = getDataSource(location);

  if (!dataSource) {
    res.status(404).json({ error: "Location not found" });
  } else {
    let customers;
    if (dataSource == PSQL_DB) {
      customers = await dataSource.getRepository(Customer).find();
    } else {
      customers = await dataSource.getMongoRepository(MCustomer).find();
    }
    res.status(200).json(customers);
  }
});

app.get("/customers", async (req: Request, res: Response) => {
  const SQLcustomers = await PSQL_DB.getRepository(Customer).find();
  const MONGOcustomers = await MONGO_DB.getMongoRepository(MCustomer).find();
  res.status(200).json(SQLcustomers.concat(MONGOcustomers));
});

app.post("/:location/customer", async (req: Request, res: Response) => {
  const { location } = req.params;
  const dataSource = getDataSource(location);
  const data = req.body;
  let customers;
  const customer: Customer = {
    id: data.customerId,
    name: data.name,
    address: data.address,
    email: data.email,
    city: data.city,
  };
  const mcustomer: MCustomer = {
    id: data.customerId,
    name: data.name,
    address: data.address,
    email: data.email,
    city: data.city,
  };

  if (!dataSource) {
    res.status(404).json({ error: "Location not found" });
  } else {
    if (dataSource == PSQL_DB) {
      customers = await dataSource.getRepository(Customer).save(customer);
    } else {
      customers = await dataSource
        .getMongoRepository(MCustomer)
        .save(mcustomer);
    }
    res.status(200).json(customers);
  }
});

app.patch("/:location/customer/:id", async (req: Request, res: Response) => {
  const { location, id } = req.params;
  const dataSource = getDataSource(location);
  const data = req.body;
  let customers;
  const customer = {
    email: data.email,
  };

  if (!dataSource) {
    res.status(404).json({ error: "Location not found" });
  } else {
    if (dataSource == PSQL_DB) {
      customers = await dataSource
        .getRepository(Customer)
        .update({ id: Number(id) }, customer);
    } else {
      customers = await dataSource
        .getMongoRepository(MCustomer)
        .updateOne({ _id: new ObjectId(id) }, { $set: customer });
    }
    res.status(200).json(customers);
  }
});

app.delete("/:location/customer/:id", async (req: Request, res: Response) => {
  const { location, id } = req.params;
  const dataSource = getDataSource(location);
  let customers;

  if (!dataSource) {
    res.status(404).json({ error: "Location not found" });
  } else {
    if (dataSource == PSQL_DB) {
      customers = await dataSource.getRepository(Customer).delete(id);
    } else {
      customers = await dataSource.getMongoRepository(MCustomer).delete(id);
    }
    res.status(200).json(customers);
  }
});

function getDataSource(location: string): DataSource | null {
  switch (location.toLowerCase()) {
    case "new-york":
      return PSQL_DB;
    case "los-angeles":
      return MONGO_DB;
    default:
      return null;
  }
}

const PORT = 8000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await initializeDatabases();
});
