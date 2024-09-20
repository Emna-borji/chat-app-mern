import { Container, Col, Row } from 'react-bootstrap';
const MyChatsContainer = ({ children }) => {
  return (
    <Container>
      <Row className="mt-5">
        <Col xs={12} md={5} className="card p-5">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default MyChatsContainer