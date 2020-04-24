import React, { Component } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import {Button, Spinner} from "react-bootstrap";


function LoadingBadge () {
    const { promiseInProgress }= usePromiseTracker();
    let visibility = (promiseInProgress === true) ?'visible':'hidden';
    return (
            <Button variant="primary" disabled style={{visibility: visibility}}>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        );
}

export default LoadingBadge