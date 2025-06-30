export default {
  apps: [
    {
      name: 'fp-api-staging',
      script: './index.js',
      env: {
        NODE_ENV: 'staging'
      }
    },
    {
      name: 'fp-api-production',
      script: './index.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
