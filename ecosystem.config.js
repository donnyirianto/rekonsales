module.exports = {
  apps : [{
      name: "rekonsales",
      script: "server.js", 
      autorestart: true,
      max_memory_restart: "900M",
      watch: ".",
      exec_mode  : "fork"
    },
  ], 
};
