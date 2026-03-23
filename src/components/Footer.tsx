import { Col, Container, Row } from "react-bootstrap";

export function MainFooter() {
  return (
    <footer className="bg-secondary text-white mt-5 p-4 position-fixed bottom-0 min-vw-100">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>A Maryland based software development group</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <Row className="align-items-start text-white">
              <Col>
                <a href="https://github.com/Summersweet-Software/">Github</a>
              </Col>
              <Col>
                <a href="https://discord.gg/CZ3Hfpzdep">discord</a>
              </Col>
            </Row>
          </Col>
          {/*<Col md={4}>
                <h5>Contact</h5>
                <p>Email: contact@summersweet.software</p>
            </Col>*/}
        </Row>
      </Container>
    </footer>
  );
}
