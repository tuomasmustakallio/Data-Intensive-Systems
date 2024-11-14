import { DataSource } from "typeorm";
import { Customer } from "./entity/Customer";
import { Order } from "./entity/Order";
import { Product } from "./entity/Product";
import { Supplier } from "./entity/Supplier";

export async function seedData(
  dataSource: DataSource,
  location: keyof typeof locationData
) {
  const locationEntities = locationData[location];

  await dataSource.getRepository(Order).clear();
  await dataSource.getRepository(Customer).clear();
  await dataSource.getRepository(Product).clear();
  await dataSource.getRepository(Supplier).clear();

  await dataSource.getRepository(Customer).save(locationEntities.customers);
  await dataSource.getRepository(Order).save(locationEntities.orders);
  await dataSource.getRepository(Product).save(locationEntities.products);
  await dataSource.getRepository(Supplier).save(locationEntities.suppliers);
}

const locationData = {
  new_york: {
    customers: [
      {
        customerId: 1,
        name: "John Doe",
        address: "123 NY St.",
        email: "john.doe@nyc.com",
        city: "New York",
      },
      {
        customerId: 2,
        name: "Jane Smith",
        address: "456 Manhattan Blvd.",
        email: "jane.smith@nyc.com",
        city: "New York",
      },
      {
        customerId: 3,
        name: "Alice Johnson",
        address: "789 Broadway",
        email: "alice.johnson@nyc.com",
        city: "New York",
      },
      {
        customerId: 4,
        name: "Robert Brown",
        address: "101 Wall St.",
        email: "robert.brown@nyc.com",
        city: "New York",
      },
      {
        customerId: 5,
        name: "Emily White",
        address: "202 Central Park W",
        email: "emily.white@nyc.com",
        city: "New York",
      },
    ],
    orders: [
      {
        orderId: 101,
        customerId: 1,
        productId: 201,
        orderDate: "2023-10-01",
        quantity: 2,
      },
      {
        orderId: 102,
        customerId: 2,
        productId: 202,
        orderDate: "2023-10-05",
        quantity: 1,
      },
      {
        orderId: 103,
        customerId: 3,
        productId: 203,
        orderDate: "2023-10-12",
        quantity: 4,
      },
      {
        orderId: 104,
        customerId: 4,
        productId: 201,
        orderDate: "2023-10-20",
        quantity: 1,
      },
      {
        orderId: 105,
        customerId: 5,
        productId: 202,
        orderDate: "2023-10-25",
        quantity: 3,
      },
    ],
    products: [
      {
        productId: 201,
        productName: "Laptop",
        category: "Electronics",
        price: 800,
      },
      {
        productId: 202,
        productName: "Phone",
        category: "Electronics",
        price: 500,
      },
      {
        productId: 203,
        productName: "Tablet",
        category: "Electronics",
        price: 300,
      },
      {
        productId: 204,
        productName: "Monitor",
        category: "Electronics",
        price: 150,
      },
      {
        productId: 205,
        productName: "Keyboard",
        category: "Accessories",
        price: 50,
      },
    ],
    suppliers: [
      {
        supplierId: 301,
        supplierName: "East Coast Supply",
        contact: "ecs@supplies.com",
        city: "New York",
        productId: 201,
      },
      {
        supplierId: 302,
        supplierName: "NY Tech Supplies",
        contact: "nyts@supplies.com",
        city: "New York",
        productId: 202,
      },
      {
        supplierId: 303,
        supplierName: "Empire Electronics",
        contact: "ee@supplies.com",
        city: "New York",
        productId: 203,
      },
      {
        supplierId: 304,
        supplierName: "Manhattan Goods",
        contact: "mg@supplies.com",
        city: "New York",
        productId: 204,
      },
      {
        supplierId: 305,
        supplierName: "NYC Accessories",
        contact: "nyca@supplies.com",
        city: "New York",
        productId: 205,
      },
    ],
  },
  los_angeles: {
    customers: [
      {
        customerId: 6,
        name: "Tom Green",
        address: "900 Sunset Blvd.",
        email: "tom.green@la.com",
        city: "Los Angeles",
      },
      {
        customerId: 7,
        name: "Lisa Black",
        address: "110 Hollywood Rd.",
        email: "lisa.black@la.com",
        city: "Los Angeles",
      },
      {
        customerId: 8,
        name: "Gary Wilson",
        address: "220 Venice Blvd.",
        email: "gary.wilson@la.com",
        city: "Los Angeles",
      },
      {
        customerId: 9,
        name: "Anna Lee",
        address: "330 Melrose Ave.",
        email: "anna.lee@la.com",
        city: "Los Angeles",
      },
      {
        customerId: 10,
        name: "Chris White",
        address: "440 Fairfax Ave.",
        email: "chris.white@la.com",
        city: "Los Angeles",
      },
    ],
    orders: [
      {
        orderId: 106,
        customerId: 6,
        productId: 201,
        orderDate: "2023-11-01",
        quantity: 3,
      },
      {
        orderId: 107,
        customerId: 7,
        productId: 202,
        orderDate: "2023-11-05",
        quantity: 2,
      },
      {
        orderId: 108,
        customerId: 8,
        productId: 203,
        orderDate: "2023-11-10",
        quantity: 5,
      },
      {
        orderId: 109,
        customerId: 9,
        productId: 204,
        orderDate: "2023-11-15",
        quantity: 1,
      },
      {
        orderId: 110,
        customerId: 10,
        productId: 205,
        orderDate: "2023-11-20",
        quantity: 2,
      },
    ],
    products: [
      {
        productId: 201,
        productName: "Laptop",
        category: "Electronics",
        price: 800,
      },
      {
        productId: 202,
        productName: "Phone",
        category: "Electronics",
        price: 500,
      },
      {
        productId: 203,
        productName: "Tablet",
        category: "Electronics",
        price: 300,
      },
      {
        productId: 204,
        productName: "Monitor",
        category: "Electronics",
        price: 150,
      },
      {
        productId: 205,
        productName: "Keyboard",
        category: "Accessories",
        price: 50,
      },
    ],
    suppliers: [
      {
        supplierId: 306,
        supplierName: "West Coast Supply",
        contact: "wcs@supplies.com",
        city: "Los Angeles",
        productId: 201,
      },
      {
        supplierId: 307,
        supplierName: "LA Tech Supplies",
        contact: "lats@supplies.com",
        city: "Los Angeles",
        productId: 202,
      },
      {
        supplierId: 308,
        supplierName: "Hollywood Electronics",
        contact: "he@supplies.com",
        city: "Los Angeles",
        productId: 203,
      },
      {
        supplierId: 309,
        supplierName: "LA Goods",
        contact: "lg@supplies.com",
        city: "Los Angeles",
        productId: 204,
      },
      {
        supplierId: 310,
        supplierName: "LA Accessories",
        contact: "laa@supplies.com",
        city: "Los Angeles",
        productId: 205,
      },
    ],
  },
  chicago: {
    customers: [
      {
        customerId: 11,
        name: "Peter Parker",
        address: "500 Michigan Ave.",
        email: "peter.parker@chi.com",
        city: "Chicago",
      },
      {
        customerId: 12,
        name: "Mary Jane",
        address: "600 Lake Shore Dr.",
        email: "mary.jane@chi.com",
        city: "Chicago",
      },
      {
        customerId: 13,
        name: "Steve Rogers",
        address: "700 Navy Pier",
        email: "steve.rogers@chi.com",
        city: "Chicago",
      },
      {
        customerId: 14,
        name: "Bruce Wayne",
        address: "800 Chicago Ave.",
        email: "bruce.wayne@chi.com",
        city: "Chicago",
      },
      {
        customerId: 15,
        name: "Clark Kent",
        address: "900 Willis Tower",
        email: "clark.kent@chi.com",
        city: "Chicago",
      },
    ],
    orders: [
      {
        orderId: 111,
        customerId: 11,
        productId: 201,
        orderDate: "2023-12-01",
        quantity: 1,
      },
      {
        orderId: 112,
        customerId: 12,
        productId: 202,
        orderDate: "2023-12-03",
        quantity: 2,
      },
      {
        orderId: 113,
        customerId: 13,
        productId: 203,
        orderDate: "2023-12-05",
        quantity: 3,
      },
      {
        orderId: 114,
        customerId: 14,
        productId: 204,
        orderDate: "2023-12-07",
        quantity: 4,
      },
      {
        orderId: 115,
        customerId: 15,
        productId: 205,
        orderDate: "2023-12-10",
        quantity: 5,
      },
    ],
    products: [
      {
        productId: 201,
        productName: "Laptop",
        category: "Electronics",
        price: 800,
      },
      {
        productId: 202,
        productName: "Phone",
        category: "Electronics",
        price: 500,
      },
      {
        productId: 203,
        productName: "Tablet",
        category: "Electronics",
        price: 300,
      },
      {
        productId: 204,
        productName: "Monitor",
        category: "Electronics",
        price: 150,
      },
      {
        productId: 205,
        productName: "Keyboard",
        category: "Accessories",
        price: 50,
      },
    ],
    suppliers: [
      {
        supplierId: 311,
        supplierName: "Midwest Supply",
        contact: "mws@supplies.com",
        city: "Chicago",
        productId: 201,
      },
      {
        supplierId: 312,
        supplierName: "Chi Tech Supplies",
        contact: "cts@supplies.com",
        city: "Chicago",
        productId: 202,
      },
      {
        supplierId: 313,
        supplierName: "Chicago Electronics",
        contact: "ce@supplies.com",
        city: "Chicago",
        productId: 203,
      },
      {
        supplierId: 314,
        supplierName: "Chicago Goods",
        contact: "cg@supplies.com",
        city: "Chicago",
        productId: 204,
      },
      {
        supplierId: 315,
        supplierName: "Chicago Accessories",
        contact: "ca@supplies.com",
        city: "Chicago",
        productId: 205,
      },
    ],
  },
};
