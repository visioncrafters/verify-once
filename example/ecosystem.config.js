module.exports = {
  apps: [
    {
      name: "example",
      script: "yarn",
      interpreter: "/bin/bash",
      args: "workspace jumio start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
