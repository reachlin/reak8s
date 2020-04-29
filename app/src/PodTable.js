import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import React, { Component } from "react";
import { trackPromise} from 'react-promise-tracker';

class PodTable extends Component {
    state = {data: []}

    fetchResources(){
        console.log('fetch pods');
        trackPromise(
        fetch(`/clusters/resource?rt=${this.props.resourceType}&cluster=${this.props.clusterName}&ns=${this.props.nameSpace}`)
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
        if (this.props.clusterName && this.props.nameSpace && this.props.resourceType) {
            if (this.props.clusterName !== prevProps.clusterName ||
                this.props.nameSpace !== prevProps.nameSpace ||
                this.props.resourceType !== prevProps.resourceType) {
                this.fetchResources();
            }
        }
    };

    render() {
        const columns = [{
          dataField: 'name',
          text: 'Name',
          sort: true,
          filter: textFilter()
        },
        {
          dataField: 'status',
          text: 'Status',
          sort: true,
          filter: textFilter()
        },
        {
          dataField: 'node',
          text: 'Node',
          sort: true,
          filter: textFilter()
        }];
        return(
            <BootstrapTable
                keyField='name' 
                data={ this.state.data }
                columns={ columns }
                striped
                hover
                condensed
                noDataIndication={()=>'No Data'}
                filter={ filterFactory() }
                pagination={ paginationFactory() } />
        )
    }
}

export default PodTable