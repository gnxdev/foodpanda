// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'staging',
      script: './backend/index.js',
      env: {
        NODE_ENV: 'staging'
      }
    },
    {
      name: 'production',
      script: './backend/index.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
