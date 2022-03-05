import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { collection, getDocs } from "firebase/firestore";
import fireDb from "../fireConfig";

function OrdersPage() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDb, "orders"));
      console.log(result, "result from orderpage");
      const ordersArr = [];
      result.forEach((doc) => {
        ordersArr.push(doc.data());
        setLoading(false);
      });

      setOrders(ordersArr);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  console.log(orders, "orders");
  return (
    <Layout loading={loading}>
      <div className="p-2">
        {orders.map((item) => {
          return (
            <table className="table mt-2 order">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>
                {item.cartItems.map((item) => {
                  return (
                    <tr>
                      <td>
                        <img src={item.imageURL} height="80" width="80" />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        })}
      </div>
    </Layout>
  );
}

export default OrdersPage;
