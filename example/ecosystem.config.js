module.exports = {
  apps: [
    {
      name: "example",
      script: "yarn",
      interpreter: "/bin/bash",
      args: "start",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
