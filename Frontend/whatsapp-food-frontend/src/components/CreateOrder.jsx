import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card, InputGroup } from "react-bootstrap";
import axios from "axios";

const CreateOrder = () => {
  const [menu, setMenu] = useState([]);
  const [orderItems, setOrderItems] = useState({});
  const [customerName, setCustomerName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/menu").then((res) => setMenu(res.data));
  }, []);

  const handleQuantityChange = (itemId, qty) => {
    setOrderItems({ ...orderItems, [itemId]: Number(qty) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const items = Object.entries(orderItems)
      .filter(([id, qty]) => qty > 0)
      .map(([id, quantity]) => ({ item_id: Number(id), quantity }));

    if (!items.length) {
      alert("Please select at least one item!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/orders/", {
        customer_name: customerName,
        whatsapp_number: whatsappNumber,
        items,
      });
      alert("Order placed successfully!");
      setOrderItems({});
      setCustomerName("");
      setWhatsappNumber("");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>WhatsApp Number</Form.Label>
        <Form.Control
          type="text"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          required
        />
      </Form.Group>

      <Row>
        {menu.map((item) => (
          <Col md={6} key={item.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>Price: ₹{item.price}</Card.Text>
                <InputGroup>
                  <InputGroup.Text>Qty</InputGroup.Text>
                  <Form.Control
                    type="number"
                    min={0}
                    value={orderItems[item.id] || 0}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                  />
                </InputGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Button variant="primary" type="submit" className="mt-3">
        Place Order
      </Button>
    </Form>
  );
};

export default CreateOrder;
