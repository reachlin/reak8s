import React, { Component } from "react";
import {Container, Row, Col} from "react-bootstrap";
import logo from "./logo.svg";
import "./App.css";
import ClusterBar from "./ClusterBar";
import NameSpaceBar from "./NameSpaceBar";
import PodTable from './PodTable';
import ResourceTypeList from "./ResourceTypeList";

class App extends Component {
  state = { clusterName: null , nameSpace: null, resourceType: 'pods'};

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md={2}>
            <h3><span className="badge badge-secondary badge-light">Cluster</span></h3>
            <ClusterBar onClusterSelected={(clusterName) => this.setState({clusterName})}/>
          </Col>
          <Col md={2}>
            <h3><span className="badge badge-secondary badge-light">NameSpace</span></h3>
            <NameSpaceBar onNameSpaceSelected={(nameSpace)=>this.setState({nameSpace})} clusterName={this.state.clusterName} />
          </Col>
          <Col>
            <h3>
              <span className="badge badge-secondary badge-light">{this.state.clusterName}</span>
              <span className="badge badge-secondary badge-light">{this.state.nameSpace}</span>
              <ResourceTypeList 
              clusterName={this.state.clusterName}
              defaultValue={this.state.resourceType}
              onResourceTypeSelected={
                (resourceType)=>this.setState({resourceType})
              } />
            </h3>
            <PodTable 
              clusterName={this.state.clusterName}
              nameSpace={this.state.nameSpace}
              resourceType={this.state.resourceType}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default App;
