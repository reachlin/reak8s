import React, { Component } from "react";
import {Container, Row, Col} from "react-bootstrap";
import logo from "./logo.svg";
import "./App.css";
import ClusterBar from "./ClusterBar";

class App extends Component {
  state = { nodes: [] };

  componentDidMount() {
    fetch("/clusters/nodes")
      .then(res => res.json())
      .then(data => {
        console.log(data.items);
        this.setState({ nodes: data.items });
      });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md={2}>
            <ClusterBar />
          </Col>
          <Col>
          {this.state.nodes.map(node => (
            <div key={node.metadata.name}>{node.metadata.name}</div>
          ))}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default App;
