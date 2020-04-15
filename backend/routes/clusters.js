const express = require("express");
const router = express.Router();

const fs = require('fs');
const formidable = require('formidable');
const { KubeConfig, Client } = require("kubernetes-client");
const kubeconfig = new KubeConfig();
kubeconfig.loadFromFile("./config/lincai20200224.yaml");
const Request = require("kubernetes-client/backends/request");
const backend = new Request({ kubeconfig });
const client = new Client({ backend, version: "1.13" });

var clusters = new Map();

/* GET users listing. */
router.get("/", function(req, res, next) {
  console.log(clusters);
  let rsp = [];
  for (let cKey of clusters.keys()) {
    rsp.push({name: cKey});
  }
  res.json(rsp);
});

router.get("/nodes", function(req, res, next) {
  client.api.v1.nodes.get().then(rsp => {
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
