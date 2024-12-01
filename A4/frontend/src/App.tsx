import { useEffect, useState } from "react";
import "./App.css";
import { Customer, Order, Product, Supplier } from "./utils/types";

const server = "http://localhost:8000";
const locations = ["new-york", "los-angeles"];

function App() {
  const [location, setLocation] = useState<string>("new-york");
  const [sCustomers, setSCustomers] = useState<Customer[]>([]);
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [updateCustomerId, setUpdateCustomerId] = useState<string>("");
  const [deleteCustomerId, setDeleteCustomerId] = useState<string>("");

  const fetchData = async (location: string) => {
    try {
      const [specificCustomers, allCustomers] = await Promise.all([
        fetch(`${server}/${location}/customers`).then((res) => res.json()),
        fetch(`${server}/customers`).then((res) => res.json()),
      ]);
      setSCustomers(specificCustomers);
      setAllCustomers(allCustomers);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const addCustomer = async () => {
    const newCustomer = {
      customerId: 1,
      name: "Matti Meikäläinen",
      address: "Laserkatu 10",
      email: "iki@iki.fi",
      city: location,
    };
    try {
      await fetch(`${server}/${location}/customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });
      fetchData(location);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const updateCustomerEmail = async () => {
    if (!updateCustomerId) {
      return;
    }
    try {
      await fetch(`${server}/${location}/customer/${updateCustomerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "" }),
      });
      fetchData(location);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const deleteCustomer = async () => {
    if (!deleteCustomerId) {
      return;
    }
    try {
      await fetch(`${server}/${location}/customer/${deleteCustomerId}`, {
        method: "DELETE",
      });
      fetchData(location);
    } catch (error) {
      console.log("Error :", error);
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
      <h2>Manage {location}:</h2>
      <p>
        Add new customer id: 1, Name: Matti Meikäläinen, Address: Laserkatu 10,
        email: iki@iki.fi, city: {location}
      </p>
      <button onClick={addCustomer}>add</button>
      <p>Input id to update their email as empty</p>
      <input
        value={updateCustomerId}
        onChange={(e) => setUpdateCustomerId(e.target.value)}
      />
      <button onClick={updateCustomerEmail}>update</button>
      <p>Input id to delete the customer</p>
      <input
        value={deleteCustomerId}
        onChange={(e) => setDeleteCustomerId(e.target.value)}
      />
      <button onClick={deleteCustomer}>delete</button>
      <h2>Customers from {location}</h2>
      {sCustomers.map((customer) => (
        <div>
          <p>{customer.id}</p>
          <p>{customer.name}</p>
          <p>{customer.address}</p>
          <p>{customer.email}</p>
          <p>{customer.city}</p>
          <br />
        </div>
      ))}
      <h2>All Customers</h2>
      {allCustomers.map((customer) => (
        <div>
          <p>{customer.id}</p>
          <p>{customer.name}</p>
          <p>{customer.address}</p>
          <p>{customer.email}</p>
          <p>{customer.city}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default App;
