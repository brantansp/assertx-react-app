module.exports = {
  apps: [
    {
      name: 'server',
      script: './server.js',
      cwd: './',
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      exec_mode: 'fork',
      pm2_max_memory_restart: '10',
    },
    {
      name: 'react-app',
      script: 'npm',
      args: 'start',
      cwd: './client',
      interpreter: 'none',
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      exec_mode: 'fork',
      pm2_max_memory_restart: '10',
      pm2_args: '--no-daemon',
    },
  ],
};