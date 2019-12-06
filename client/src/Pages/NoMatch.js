import React from "react";
import { Jumbotron, Col, Row, Container} from "react-bootstrap";

function NoMatch() {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>404 Page Not Found</h1>            
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default NoMatch;