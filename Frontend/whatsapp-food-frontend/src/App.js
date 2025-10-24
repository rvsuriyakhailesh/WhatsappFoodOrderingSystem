import { Container, Navbar, Row, Col, Tab, Tabs, Card } from "react-bootstrap";
import Menu from "./components/Menu";
import Orders from "./components/Orders";
import CreateOrder from "./components/CreateOrder";

function App() {
  return (
    <>
    
      <Navbar
        expand="lg"
        className="shadow-sm"
        style={{
          background: "linear-gradient(90deg, #4b6cb7, #182848)",
          color: "white",
        }}
      >
        <Container>
          <Navbar.Brand className="text-white fw-bold fs-4">
             WhatsApp Food Ordering
          </Navbar.Brand>
        </Container>
      </Navbar>

    
      <Container className="py-5">
        <Row className="mb-5">
          <Col md={5}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <Card.Title className="text-center text-primary mb-3 fs-4">
                   Menu
                </Card.Title>
                <Menu />
              </Card.Body>
            </Card>
          </Col>

          <Col md={7}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <Card.Title className="text-center text-success mb-3 fs-4">
                   Orders
                </Card.Title>

                
                <Tabs
                  defaultActiveKey="current"
                  id="orders-tabs"
                  className="mb-3 justify-content-center"
                  fill
                >
                  <Tab eventKey="current" title="Current Orders">
                    <Orders filter="current" />
                  </Tab>
                  <Tab eventKey="cancelled" title="Cancelled Orders">
                    <Orders filter="cancelled" />
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <h3 className="text-center text-primary mb-4">
                   Place a New Order
                </h3>
                <CreateOrder />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
