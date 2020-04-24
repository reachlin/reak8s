import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import React, { Component } from "react";
import { trackPromise} from 'react-promise-tracker';

class PodTable extends Component {
    state = {data: []}

    fetchPods(){
        console.log('fetch pods');
        trackPromise(
        fetch(`/clusters/pods?cluster=${this.props.clusterName}&ns=${this.props.nameSpace}`)
        .then(res => res.json()).then(json => {
            let data = [];
            json.items.map(item => {
                console.log(item);
                data.push({name: item.metadata.name, status: item.status.phase, node: item.status.hostIP})
            })
            this.setState({data: data})
        }));
    }
 
    componentDidUpdate(prevProps) {
        if (this.props.clusterName != prevProps.clusterName ||
            this.props.nameSpace != prevProps.nameSpace) {
            this.fetchPods();
        }
    };

    render() {
        const columns = [{
          dataField: 'name',
          text: 'Name'
        },
        {
          dataField: 'status',
          text: 'Status'
        },
        {
          dataField: 'node',
          text: 'Node'
        }];
        return(
            <BootstrapTable keyField='name' data={ this.state.data } columns={ columns } />
        )
    }
}

export default PodTable