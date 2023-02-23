import React from "react";
import { Col, Container, Row, Table } from "reactstrap";

export const Details = ({ imgUrl, details }) => {
  return (
    <Container>
      <Row xs={xs} sm={sm} md={md}>
        <Col className="bg-light border">
          <img src={imgUrl} />
        </Col>
        <Col className="bg-light border">
          <Table striped>
            <tbody>
              {Object.entries(details).map(([detail, value]) => {
                return (
                  <tr key={value}>
                    <th scope="row">{detail}</th>
                    <td>{value}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
