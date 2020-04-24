import React, { Component } from "react";
import {Button, Modal, Form} from "react-bootstrap";

class AddClusterDialog extends Component {
    state = { show: false, clusterName: '', configFile: null };

    handleShow = () => this.setState({show: true});
    handleClose = () => this.setState({show: false});
    handleSave = () => {        
        this.setState({show: false});
        console.log(this.state.clusterName, this.state.configFile);
        const data = new FormData();
        data.append('file', this.state.configFile);
        data.append('name', this.state.clusterName);
        fetch('/clusters', {
            method: 'POST',
            body: data
        }).then((resp) => resp.json())
        .then((data) => {
          console.log('Request succeeded with JSON response', data);
          this.props.onSave();
        })
        .catch((error) => {
          console.log('Request failed', error);
        });
    }
    handleClusterNameChange = (event) => {
        this.setState({clusterName: event.target.value});
    }
    handleClusterConfigureChange = (event) => {
        this.setState({configFile: event.target.files[0]});
    }

    render(){
        return(
            <React.Fragment>
            <Button className="btn btn-primary" onClick={this.handleShow}>Add</Button>
            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a cluster</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group controlId="formClusterName">
                    <Form.Label>Cluster Name</Form.Label>
                    <Form.Control type="text" onChange={this.handleClusterNameChange} />
                </Form.Group>

                <Form.Group controlId="formClusterConfigureFile">
                    <Form.Label>Configure File</Form.Label>
                    <Form.Control type="file" onChange={this.handleClusterConfigureChange} />
                </Form.Group>
            </Form>                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                Cancel
                </Button>
                <Button variant="primary" onClick={this.handleSave}>
                Save
                </Button>
            </Modal.Footer>
            </Modal>
            </React.Fragment>          
        )
    }
}

export default AddClusterDialog