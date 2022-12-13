module.exports = {
  apps : [{
    name   : "app1",
    script : "./server.js",
    instances : "max",
    exec_mode : "cluster"
  }]
}
