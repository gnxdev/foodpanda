// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'fp-api-staging',
      script: './backend/index.js',
      env: {
        NODE_ENV: 'staging'
      }
    },
    {
      name: 'fp-api-production',
      script: './backend/index.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
