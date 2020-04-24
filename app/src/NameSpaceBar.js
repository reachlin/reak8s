import React, { Component } from "react";
import {Button} from "react-bootstrap";
import { trackPromise} from 'react-promise-tracker';

class NameSpaceBar extends Component {
    state = { namespaces: [] };
    
    fetchWithDelay = (url) => {
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(fetch(url, {
              method: 'GET',
            })
              .then((response) => response.json()));
          }, 3000)
        });
      
        return promise;
    }

    fetchNameSpaces(){
        console.log(this.props.clusterName);
        trackPromise(this.fetchWithDelay(`/clusters/namespace?cluster=${this.props.clusterName}`)
        .then((rsp)=>{
            this.setState({namespaces: rsp.data})
        }));
    }

    componentDidUpdate(prevProps) {
        if (this.props.clusterName != prevProps.clusterName) {
            this.fetchNameSpaces();
        }
    };

    render() {
        return(
            <div className="list-group">
                {this.state.namespaces && this.state.namespaces.map(
                    ns => <Button onClick={()=>{this.props.onNameSpaceSelected(ns.metadata.name)}} key={ns.metadata.name} className="list-group-item list-group-item-action">{ns.metadata.name}</Button>)}
            </div>
        )
    }
}

export default NameSpaceBar