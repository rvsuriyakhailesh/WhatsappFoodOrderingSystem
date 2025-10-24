import React, { useEffect, useState } from "react";
import API from "../api";
import {
  Card,
  Button,
  Form,
  ListGroup,
  Alert,
  Spinner,
  Badge,
} from "react-bootstrap";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    available: true,
  });

  const fetchMenu = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await API.get("/menu/");
      setMenu(res.data);
    } catch (e) {
      setErr(" Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = name === "available" ? value === "true" : value;
    setForm((s) => ({ ...s, [name]: val }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        available: form.available === "true" || form.available === true,
      };
      await API.post("/menu/", payload);
      setForm({ name: "", description: "", price: "", available: true });
      fetchMenu();
    } catch (e) {
      setErr(" Failed to add menu item");
    }
  };

  return (
    <Card className="shadow-lg border-0 rounded-4">
      <Card.Body>
        <Card.Title className="mb-3 fw-bold text-primary">
           Menu Management
        </Card.Title>

        {err && <Alert variant="danger">{err}</Alert>}

        <Form onSubmit={handleAdd} className="mb-3">
          <Form.Group className="mb-2">
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Item name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description"
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              name="price"
              value={form.price}
              onChange={handleChange}
              type="number"
              placeholder="Price ₹"
              step="0.01"
              required
            />
          </Form.Group>
          <Form.Select
            className="mb-3"
            name="available"
            value={form.available}
            onChange={handleChange}
          >
            <option value={true}>Available</option>
            <option value={false}>Not available</option>
          </Form.Select>

          <Button type="submit" variant="success" className="w-100 fw-semibold">
            Add Menu Item
          </Button>
        </Form>

        <h6 className="mt-4 text-muted">Current Menu</h6>
        {loading ? (
          <div className="text-center py-3">
            <Spinner animation="border" size="sm" /> Loading...
          </div>
        ) : (
          <ListGroup>
            {menu.map((m) => (
              <ListGroup.Item
                key={m.id}
                className="d-flex justify-content-between align-items-center shadow-sm mb-2 rounded"
              >
                <div>
                  <strong>{m.name}</strong> — ₹{m.price}
                  <br />
                  <small className="text-muted">{m.description}</small>
                </div>
                <Badge bg={m.available ? "success" : "secondary"}>
                  {m.available ? "Available" : "Unavailable"}
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}
