import React, { Component } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import {Button, Spinner} from "react-bootstrap";


function LoadingBadge () {
    const { promiseInProgress }= usePromiseTracker();
    let visibility = (promiseInProgress === true) ?'visible':'hidden';
    return (
            <Button className="btn-dark btn-lg" disabled >
              REAK8S
            <span className='pl-3' style={{visibility: visibility}}>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            </span>
          </Button>
        );
}

export default LoadingBadge