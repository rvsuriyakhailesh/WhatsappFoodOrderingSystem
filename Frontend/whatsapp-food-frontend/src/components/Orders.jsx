import { useEffect, useState } from "react";
import { Table, Spinner, Form } from "react-bootstrap";
import axios from "axios";

function Orders({ filter }) {
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const [ordersRes, menuRes] = await Promise.all([
        axios.get("http://localhost:8000/orders"),
        axios.get("http://localhost:8000/menu"),
      ]);

      const menuMap = {};
      menuRes.data.forEach((item) => {
        menuMap[item.id] = item.name;
      });

      let filteredOrders = ordersRes.data;
      if (filter === "current") {
        filteredOrders = filteredOrders.filter((o) => o.status !== "canceled");
      } else if (filter === "cancelled") {
        filteredOrders = filteredOrders.filter((o) => o.status === "canceled");
      }

      setMenu(menuMap);
      setOrders(filteredOrders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:8000/orders/${orderId}`, {
  status: newStatus
});


      fetchData(); // refresh list after update
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    }
  };

  if (loading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (orders.length === 0)
    return (
      <p className="text-center text-muted my-3">
        {filter === "cancelled"
          ? "No cancelled orders yet"
          : "No current orders available"}
      </p>
    );

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr className="text-center bg-light">
          <th>#</th>
          <th>Customer</th>
          <th>Items</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={order.id} className="align-middle">
            <td className="text-center">{index + 1}</td>
            <td>{order.customer_name}</td>
            <td>
              <ul className="mb-0">
                {order.items.map((item) => (
                  <li key={item.item_id}>
                    {menu[item.item_id] || "Unknown Item"} × {item.quantity}
                  </li>
                ))}
              </ul>
            </td>
            <td className="text-center">
              <Form.Select
                size="sm"
                value={order.status}
                onChange={(e) =>
                  handleStatusChange(order.id, e.target.value)
                }
              >
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="delivered">Delivered</option>
                <option value="canceled">Canceled</option>
              </Form.Select>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Orders;
