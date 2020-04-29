const express = require("express");
const router = express.Router();

const fs = require('fs');
const formidable = require('formidable');
const { KubeConfig, Client } = require("kubernetes-client");
const Request = require("kubernetes-client/backends/request");

var clusters = new Map();

function getKubeClient(clusterName) {
  let cluster = clusters.get(clusterName);
  if (cluster) {
    let client = cluster.client;
    if (client)
      return cluster.client;
    else {
      const kubeconfig = new KubeConfig();
      kubeconfig.loadFromFile(cluster.config);      
      const backend = new Request({ kubeconfig });
      client = new Client({ backend, version: "1.13" });
      cluster['client'] = client;
      clusters.set(clusterName, cluster);
      return client;
    }
  } else {
    return null;
  }
}

router.get("/", function(req, res, next) {
  console.log(clusters);
  let rsp = [];
  for (let cKey of clusters.keys()) {
    rsp.push({name: cKey});
  }
  res.json(rsp);
});

router.get("/namespace", function(req, res, next) {
  console.log(req.query.cluster);
  if (req.query.cluster) {
    let client = getKubeClient(req.query.cluster);
    if (client) {
      client.api.v1.namespaces.get().then(rsp => {
        if (rsp.body.items)
          res.json({data: rsp.body.items});
        else 
          res.json({error: rsp});
      });
    } else {
      res.json({error: `not found ${req.query.cluster}`});
    }
  } else 
    res.json({error: 'no cluster parameter'});
});

router.get("/resource", function(req, res, next) {
  let client = getKubeClient(req.query.cluster);
  let rtFunc = client.api.v1.namespaces(req.query.ns)[req.query.rt];
  rtFunc && rtFunc.get().then(rsp => {
    if (rsp.body) res.json(rsp.body);
    else res.json({});
  }).catch(err => {
    console.log(err);
    res.json({error:err});
  });
});

router.get("/api", function(req, res, next) {
  let client = getKubeClient(req.query.cluster);
  client.api.v1.get().then(rsp => {
    if (rsp.body) res.json(rsp.body);
    else res.json({});
  });
});

router.post("/", function(req, res, next){
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    console.log(fields, files);
    var oldpath = files.file.path;
    var newpath = './config/' + files.file.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        res.json({error: err, cluster: fields});
      } else {
        clusters.set(fields.name, {config: newpath});
        res.json(fields);
      }
    });
  });
});

module.exports = router;
