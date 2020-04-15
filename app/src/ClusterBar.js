import React, { Component } from "react";
import {Button} from "react-bootstrap";
import AddClusterDialog from "./AddClusterDialog";

class ClusterBar extends Component {
    state = { clusters: [] };

    fetchCluster(clusterName){
        console.log(clusterName);
    }
    fetchClusters(){
        fetch('/clusters').then(res => res.json()).then(json => this.setState({clusters:json}));
    }
    componentDidMount(){
        this.fetchClusters();
    };
    render() {
        return(
            <div className="list-group">
                {this.state.clusters.map(cluster => <Button onClick={() => this.fetchCluster(cluster.name)} key={cluster.name} className="list-group-item list-group-item-action">{cluster.name}</Button>)}
                <AddClusterDialog />
            </div>
        )
    }
}

export default ClusterBar