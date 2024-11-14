import { useEffect, useState } from "react";
import "./App.css";
import { Customer, Order, Product, Supplier } from "./utils/types";

const server = "http://localhost:8000";
const locations = ["new-york", "los-angeles", "chicago"];

function App() {
  const [location, setLocation] = useState<string>("new-york");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const fetchData = async (location: string) => {
    try {
      const [customersData, ordersData, productsData, suppliersData] =
        await Promise.all([
          fetch(`${server}/${location}/customers`).then((res) => res.json()),
          fetch(`${server}/${location}/orders`).then((res) => res.json()),
          fetch(`${server}/${location}/products`).then((res) => res.json()),
          fetch(`${server}/${location}/suppliers`).then((res) => res.json()),
        ]);
      setCustomers(customersData);
      setOrders(ordersData);
      setProducts(productsData);
      setSuppliers(suppliersData);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchData(location);
  }, [location]);
  return (
    <div>
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
      <h2>Customers</h2>
      {customers.map((customer) => (
        <div>
          <p>{customer.id}</p>
          <p>{customer.name}</p>
          <p>{customer.address}</p>
          <p>{customer.email}</p>
        </div>
      ))}
      <h2>Orders</h2>
      {orders.map((order) => (
        <div>
          <p>{order.id}</p>
          <p>{order.customerId}</p>
          <p>{order.productId}</p>
          <p>{order.orderDate}</p>
          <p>{order.quantity}</p>
        </div>
      ))}
      <h2>Products</h2>
      {products.map((product) => (
        <div>
          <p>{product.id}</p>
          <p>{product.name}</p>
          <p>{product.category}</p>
          <p>{product.price}</p>
        </div>
      ))}
      <h2>Suppliers</h2>
      {suppliers.map((supplier) => (
        <div>
          <p>{supplier.id}</p>
          <p>{supplier.name}</p>
          <p>{supplier.contact}</p>
          <p>{supplier.city}</p>
          <p>{supplier.productId}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
