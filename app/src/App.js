import React, { Component } from "react";
import {Container, Row, Col} from "react-bootstrap";
import logo from "./logo.svg";
import "./App.css";
import ClusterBar from "./ClusterBar";
import NameSpaceBar from "./NameSpaceBar";
import PodTable from './PodTable';

class App extends Component {
  state = { clusterName: null , nameSpace: null};

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md={2}>
            <ClusterBar onClusterSelected={(clusterName) => this.setState({clusterName})}/>
          </Col>
          <Col md={2}>
            <NameSpaceBar onNameSpaceSelected={(nameSpace)=>this.setState({nameSpace})} clusterName={this.state.clusterName} />
          </Col>
          <Col>
            <PodTable clusterName={this.state.clusterName} nameSpace={this.state.nameSpace} />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default App;
