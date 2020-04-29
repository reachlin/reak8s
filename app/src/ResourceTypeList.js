import React, { Component } from "react";
import {Button} from "react-bootstrap";
import { trackPromise} from 'react-promise-tracker';

class ResourceTypeList extends Component {
    state = { data: [] };
    
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
        trackPromise(this.fetchWithDelay(`/clusters/api?cluster=${this.props.clusterName}`)
        .then((rsp)=>{
            let filtered = rsp.resources.filter(
                item=>{
                    if (item.namespaced && item.verbs.includes('list'))
                        return item;
                }
            );
            console.log(filtered);
            this.setState({data: filtered})
        }));
    }

    componentDidUpdate(prevProps) {
        if (this.props.clusterName != prevProps.clusterName) {
            this.fetchNameSpaces();
        }
    };

    render() {
        return(
            <select 
                className="badge" id="optResourceType" 
                onChange={(event)=>{this.props.onResourceTypeSelected(event.target.value)}}
                value={this.props.defaultValue}>
                {this.state.data && this.state.data.map(
                    rt => <option key={rt.name}> {rt.name}</option>)}

            </select>
        )
    }
}

export default ResourceTypeList